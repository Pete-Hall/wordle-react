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
  const [matches, setMatches] = useState(new Array(5));

  useEffect(() => {
    console.log(newWord);
    if(newWord.length === 5 && newWord.toLowerCase() === WordOfTheDay.toLowerCase()) {
      console.log('you win!');
    } else if(newWord.length === 5) {
      console.log ('try another word')
      // set matching characters for each index
      const newMatches = new Array(5);
      for(let i = 0; i < WordOfTheDay.length; i++) {
        if(WordOfTheDay[i] === newWord[i].toUpperCase()) {
          newMatches[i] = true;
        } else if(WordOfTheDay.includes(newWord[i].toUpperCase())) {
          newMatches[i] = 'yellow';
        } 
        else {
          newMatches[i] = false;
        }
      }
      setMatches(newMatches);
    } else if(newWord.length > 0) {
      console.log('keep guessing');
    }
  }, [newWord])

  useEffect(() => {
    console.log('matches:', matches);
  }, [matches])

  const handleChange = (character) => {
    setNewWord(newWord + character);
  }

  return (
    <div className='row'>
      {[...new Array(5)].map((x, i) => {
        return (
          <Cell key={i} handleChange={handleChange} isMatch={matches[i]}/>
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
    <div className={`${props.isMatch === true ? 'cell--green': props.isMatch === 'yellow' ? 'cell--yellow' : ''}`}>
      <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input"/>
    </div>
  );
}



export default App;
