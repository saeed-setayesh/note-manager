import React, { useState, useEffect } from 'react';
import produce from 'immer';
import "./notes.scss"

export default () => {
  const [data, setData] = useState([]);

  const handleClick = () => {
    const text = document.querySelector('#noteinput').value.trim();
    if (text) {
      const nextState = produce(data, draftState => {
        draftState.push({ text });
      });
      document.querySelector('#noteinput').value = '';

      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }

      setData(nextState);
    }
  };

  const handleChange = (e, index) => {
    let items = [...data];
    let item = { ...items[index] };
    item.text = e.target.value
    items[index] = item;
    setData(items)
    localStorage.setItem('data', JSON.stringify(items));
  }

  const handleRemove = (index) => {
    const newData = data.filter((note) => {
      return note.text !== index.text
    })
    setData(newData)
    localStorage.setItem('data', JSON.stringify(newData));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');

      if (getData !== '' && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="forms">
          <div className='notes'>
            <input id="noteinput" type="text" placeholder="Enter a new note" />
            <div className="addItem" onClick={() => handleClick()}>Add note</div>
          </div>
          <h3 className="title-notes">Notes</h3>
          {Object.keys(data).map((note, index) => <div className='notes' key={index}>
            <input onChange={(e) => handleChange(e, index)} type="text" value={data[note].text} />
            <div className="remove" onClick={() => handleRemove(data[index])}>Remove</div>
          </div>)}
        </div>
      </div>
    </>
  );
};
