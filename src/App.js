import React, { useEffect, useState } from 'react';
import './App.css';

const WordOfTheDay = "GHOST";

function App() {
  return (
    <div className="board">
      <h1>Wordle</h1>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
}

const Row = () => {

  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    console.log(newWord);
  }, [newWord])

  const handleChange = (character) => {
    setNewWord(newWord + character);
  }

  return (
    <div className='row'>
      {[...new Array(5)].map((x, i) => {
        return (
          <Cell key={i} handleChange={handleChange}/>
        )

      })}
    </div>
  );
}

const Cell = (props) => {

  const handleCellChange = (e) => {
    props.handleChange(e.target.value);
  }

  return (
    <div>
      <input onChange={handleCellChange} type="text" maxLength={1} />
    </div>
  );
}



export default App;
