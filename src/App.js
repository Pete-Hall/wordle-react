import React, { useEffect, useState } from 'react';
import './App.css';

const WordOfTheDay = "GHOST";

function App() {

  const [win, setWin] = useState(false);
  let [counter, setCounter] = useState(0);

  return (
    <div className="board">
      <h1>Wordle</h1>
      {[...new Array(6)].map((x, i) => {
        return (
          <Row key={i} win={win} setWin={setWin} row={i + 1} counter={counter} setCounter={setCounter} />
        )
      })}
    </div>
  );
}

const Row = (props) => {

  const [newWord, setNewWord] = useState('');
  const [matches, setMatches] = useState(new Array(5));
  // let [counter, setCounter] = useState(0);
  let [cellCounter, setCellCounter] = useState(0);

  useEffect(() => {
    console.log("row id", props.id);
  }, [])

  useEffect(() => {
    console.log(newWord);
    const newMatches = new Array(5);
    if (newWord.length === 5 && newWord.toLowerCase() === WordOfTheDay.toLowerCase()) {
      console.log('you win!:', newWord);
      for (let i = 0; i < 5; i++) {
        newMatches[i] = true;
      }
      setMatches(newMatches);
      props.setWin(true);
    } else if (newWord.length === 5) {
      console.log('try another word:', newWord);
      props.setCounter(props.counter + 1);
      // set matching characters for each index
      for (let i = 0; i < WordOfTheDay.length; i++) {
        if (WordOfTheDay[i] === newWord[i].toUpperCase()) {
          newMatches[i] = true;
        } else if (WordOfTheDay.includes(newWord[i].toUpperCase())) {
          newMatches[i] = 'yellow';
        }
        else {
          newMatches[i] = false;
        }
      }
      setMatches(newMatches);
    } else if (newWord.length >= 0) {
      console.log('keep guessing');

    }
  }, [newWord])

  useEffect(() => {
    console.log('matches:', matches);
    console.log('counter:', props.counter);

  }, [matches])

  const handleChange = (character) => {
    setNewWord(newWord + character);
    // on delete key, delete character at the last index (newWord[length-1])
  }

  return (
    <div className='row'>
      {[...new Array(5)].map((x, i) => {
        return (
          <Cell key={i} handleChange={handleChange} isMatch={matches[i]} didWin={props.win} row={props.row} cellID={i} counter={props.counter} cellCounter={cellCounter} />
        )
      })}
    </div>
  );
}

// how to handle delete, how to focus on inputs

const Cell = (props) => {

  const handleCellChange = (e) => { // https://www.geeksforgeeks.org/how-to-focus-on-the-next-field-input-in-reactjs/
    props.handleChange(e.target.value);
    const nextInput = document.querySelector( // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
      `.cell_${props.cellID + 1}`
    );
    const nextRow = document.querySelector(`.row_${props.row + 1}`);

    // If found, focus the next field
    if (nextInput !== null) {
      // console.log(nextInput);
      nextInput.focus();
    } else if (nextRow != null) {
      nextRow.focus();
    }
  }

  return (
    <div className={`${props.isMatch === true ? 'cell--green' : props.isMatch === 'yellow' ? 'cell--yellow' : props.isMatch === false ? 'cell--grey' : ''}`}>
      {
        props.didWin ? <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input disabled" disabled />
          :
          props.row <= props.counter ? <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input disabled" disabled />
            :
            props.row === 1 && props.cellID === 0 ? <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input" autoFocus /> // when the page loads, auto focus on the first input
              :
              // if row === 2 and cellID === 0 and row < counter ? use a ref??
              props.row === 2 && props.cellID === 0 && props.row < props.counter ? <input onChange={handleCellChange} type="text" maxLength={1} className="cell__input" />
                :
                // if cellID <= cellCounter, function {document.getElementById("myAnchor").focus();} where myAnchor is props.row_props.cellID
                <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input row_${props.row} cell_${props.cellID}`} />
      }
    </div>
  );
}



export default App;
