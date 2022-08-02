import React, { useEffect, useState } from 'react';
import './App.css';

const WordOfTheDay = "GHOST";

function App() {

  const [win, setWin] = useState(false);

  return (
    <div className="board">
      <h1>Wordle</h1>
      {[...new Array(6)].map((x, i) => {
        return (
          <Row key={i} win={win} setWin={setWin} row={i+1}/>
        )
      })}
    </div>
  );
}

const Row = (props) => {

  const [newWord, setNewWord] = useState('');
  const [matches, setMatches] = useState(new Array(5));
  const [counter, setCounter] = useState(0);
  const [cellCounter, setCellCounter] = useState(0);

  useEffect(() => {
    console.log("row id", props.id);
  }, [])

  useEffect(() => {
    console.log(newWord);
    const newMatches = new Array(5);
    if(newWord.length === 5 && newWord.toLowerCase() === WordOfTheDay.toLowerCase()) {
      console.log('you win!');
      for(let i = 0; i < 5; i++) {
        newMatches[i] = true;
      }
      setMatches(newMatches);
      props.setWin(true);
    } else if(newWord.length === 5) {
      console.log ('try another word')
      setCounter(counter+1);
      // set matching characters for each index
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
    } else if(newWord.length >= 0) {
      console.log('keep guessing');
      setCellCounter(cellCounter+1);
      
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
          <Cell key={i} handleChange={handleChange} isMatch={matches[i]} didWin={props.win} row={props.row} cellID={i} counter={counter} cellCounter={cellCounter}/>
        )
      })}
    </div>
  );
}

// how to handle delete, how to focus on inputs

const Cell = (props) => {

  const handleCellChange = (e) => {
    props.handleChange(e.target.value);
  }



  // disabled where row >= counter

  return (
    <div className={`${props.isMatch === true ? 'cell--green': props.isMatch === 'yellow' ? 'cell--yellow' : props.isMatch === false ? 'cell--grey' : ''}`}>
      {
        props.didWin ? <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input" disabled/> 
        :
        props.row <= props.counter ? <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input" disabled/>
        :
        // if cellID <= cellCounter, function {document.getElementById("myAnchor").focus();} where myAnchor is props.row_props.cellID
        <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input ${props.row}_${props.cellID}` } />
      }
    </div>
  );
}



export default App;
