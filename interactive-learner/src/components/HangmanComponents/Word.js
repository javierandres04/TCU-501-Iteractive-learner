import React from 'react';

const Word = ({ selectedWord, correctLetters }) => {

  return (
    <div className="word">
      {selectedWord.split('').map((letter, i) => {
        if(letter !== ' '){
          return (
            <span className="letter" key={i}>
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          )
        }else{
          return (
            <span className="space" key={i}>
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          )
        }
      })}
    </div>
  )
}

export default Word