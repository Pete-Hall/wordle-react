import React, { useEffect, useState } from 'react';
import './App.css';

const WordOfTheDay = "GHOST";

function App() {

  const [win, setWin] = useState(false); // used to determine if the guess was a win or not
  let [counter, setCounter] = useState(0);

  return (
    <div className="board">
      <h1>Wordle</h1>
      {[...new Array(6)].map((x, i) => { // map through to create the 6 different row
        return (
          <Row key={i} win={win} setWin={setWin} row={i + 1} counter={counter} setCounter={setCounter} />
        )
      })}
    </div>
  );
}

const Row = (props) => {

  const [newWord, setNewWord] = useState(''); // initialize a hook to store the state of the word guessed in that row
  const [matches, setMatches] = useState(new Array(5)); // initalize an empty array to fill with the match outcome for each cell in a row
  /* let [cellCounter, setCellCounter] = useState(0); */ // not using cellCounter or setCellCounter

  useEffect(() => {
    console.log(newWord);
    const newMatches = new Array(5); // initialize a new array to store the outcome of each letter guessed
    if (newWord.length === 5 && newWord.toLowerCase() === WordOfTheDay.toLowerCase()) { // if the word guess is correct
      console.log('you win!:', newWord);
      for (let i = 0; i < 5; i++) {
        newMatches[i] = true; // in a loop that runs 5 times, set the index at which there is a match to true
      }
      setMatches(newMatches); // set the matches array to the current value of the newMatches array
      props.setWin(true); // record a win
    } else if (newWord.length === 5) { // if user guesses a word but it is NOT correct
      console.log('try another word:', newWord);
      props.setCounter(props.counter + 1); // increment the counter (number of guesses)
      // set matching characters for each index
      for (let i = 0; i < WordOfTheDay.length; i++) {
        if (WordOfTheDay[i] === newWord[i].toUpperCase()) {
          newMatches[i] = true; // if the character at an index in the WordOfTheDay is equal to the character at the same index in the guessed word, return a true in the newMatches array at that index
        } else if (WordOfTheDay.includes(newWord[i].toUpperCase())) { 
          newMatches[i] = 'yellow'; // if a guessed letter is used within any index other than the same one in the WordOfTheDay, return yellow for that index guessed (yellow will be used to create a class name. I know I'm messing with different types for now)
        }
        else {
          newMatches[i] = false; // if the letter is not at the correct index or not in the WordOfTheDay at all, return false for that index
        }
      }
      setMatches(newMatches); // set the matches as the newMatches we just filled with true's, false's, and yellow's
    } else if (newWord.length >= 0) {
      console.log('keep guessing');

    }
  }, [newWord])

  useEffect(() => {
    console.log('matches:', matches);
    console.log('counter:', props.counter);

  }, [matches])

  const handleChange = (character) => {
    setNewWord(newWord + character); // concat a string one character at a time that will be used as the user's guess
    // TODO: something like, on delete key, delete character at the last index (newWord[length-1])
  }

  return (
    <div className='row'>
      {[...new Array(5)].map((x, i) => { // map through to create each cell for the row
        return (
          <Cell key={i} handleChange={handleChange} isMatch={matches[i]} didWin={props.win} row={props.row} cellID={i} counter={props.counter} /* cellCounter={cellCounter} */ /> // not using cellCounter in the props as of now
        )
      })}
    </div>
  );
}

// how to handle delete, how to focus on inputs

const Cell = (props) => {

  const handleCellChange = (e) => { // https://www.geeksforgeeks.org/how-to-focus-on-the-next-field-input-in-reactjs/
    props.handleChange(e.target.value); // gather the user input
    const nextInput = document.querySelector( // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
      `.cell_${props.cellID + 1}` // let nextInput equal to the input on the DOM next to the one just guessed
    );
    const nextRow = document.querySelector(`.row_${props.row + 1}`); // let the nextRow equal to the input on the DOM on the next row

    // If found, focus the next field
    if (nextInput !== null) {
      // console.log(nextInput);
      nextInput.focus();
    } else if (nextRow != null) {
      nextRow.focus();
    }
  }

  return (
    <div >
      { // one large ternary to conditionally render the appropriate cells/rows
        props.didWin ? <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input disabled ${props.isMatch === true ? 'cell--green' : props.isMatch === 'yellow' ? 'cell--yellow' : props.isMatch === false ? 'cell--grey' : ''}`} disabled />  
          :
          props.row <= props.counter ? <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input disabled ${props.isMatch === true ? 'cell--green' : props.isMatch === 'yellow' ? 'cell--yellow' : props.isMatch === false ? 'cell--grey' : ''}`} disabled /> // as the user guesses, disable the just-guessed row of inputs
            :
            props.row === 1 && props.cellID === 0 ? <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input ${props.isMatch === true ? 'cell--green' : props.isMatch === 'yellow' ? 'cell--yellow' : props.isMatch === false ? 'cell--grey' : ''}`} autoFocus /> // when the page loads, auto focus on the first input
              // :
              // // if row === 2 and cellID === 0 and row < counter ? use a ref??
              // props.row === 2 && props.cellID === 0 && props.row < props.counter ? <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input ${props.isMatch === true ? 'cell--green' : props.isMatch === 'yellow' ? 'cell--yellow' : props.isMatch === false ? 'cell--grey' : ''}`} />
                :
                <input onChange={handleCellChange} type="text" maxLength={1} className={`cell__input row_${props.row} cell_${props.cellID}`} /> // empty rows to come
      }
    </div>
  );
}



export default App;
