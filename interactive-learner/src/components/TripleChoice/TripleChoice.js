import React from 'react';
import './TripleChoice.css';

const route = "../../.."

const playSound = (soundName) => {
  let sound = new Audio(`./sounds/${soundName}.m4a`);
  sound.play();
}

const handleClickedImage = (index, rightChoice) => {
  console.log("HandleClick " + index);
  if(index === rightChoice) {
    console.log("\tRight choice selected");
  } else {
    console.log("\tWrong choice selected");
  }
};

export const TripleChoice = ({ words, rightChoice, playSelectSound, addAttemp, addMatch }) => {
  let wordList = [];
  words.forEach((word, index)=>{
    wordList.push( 
    )
  })
    return (
      <ul>
        <div id = "cards-container">
          <div id = "cards-grid">
            <img id = "card" src={route+words[0].imageSrc} alt={words.word} onClick={() => (handleClickedImage(0, rightChoice), playSelectSound())} style={{ cursor: 'pointer' }}></img>
            <img id = "card" src={route+words[1].imageSrc} alt={words.word} onClick={() => (handleClickedImage(1, rightChoice), playSelectSound())} style={{ cursor: 'pointer' }}></img>
            <img id = "card" src={route+words[2].imageSrc} alt={words.word} onClick={() => (handleClickedImage(2, rightChoice), playSelectSound())} style={{ cursor: 'pointer' }}></img>
          </div>
        </div>
      </ul>
    );  
};
