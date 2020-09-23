import React, { useState, useEffect } from 'react';
import produce from 'immer';

export default () => {
  const initialData = [{ text: 'Loading Notes ... ' }];
  const [data, setData] = useState(initialData);

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
      <input id="noteinput" style={{ width: '80%' }} type="text" placeholder="Enter a new note" />
      <button onClick={() => handleClick()}>Add note</button>
      {Object.keys(data).map((note, index) => <div key={index}>
        <input onChange={(e) => { setData({ ...data, [index]: { ...data[index], text: e.target.value } }) }} type="text" value={data[note].text} />
        <div onClick={(e) => handleRemove(data[index])}>Remove</div>
      </div>)}
    </>
  );
};
