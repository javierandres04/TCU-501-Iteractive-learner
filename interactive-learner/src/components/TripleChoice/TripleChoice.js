import React from 'react';
import './TripleChoice.css';

const route = "../../.."

const handleClickedImage = (index, rightChoice, addMatch) => {
  console.log("HandleClick " + index);
  if(index === rightChoice) {
  addMatch();
  console.log("\tRight choice selected");
  } else {
    console.log("\tWrong choice selected");
  }
};

/**
 * Receives an array of 3 image routes and a number for the right choice
 */
export const TripleChoice = ({ words, rightChoice, playSelectSound, addAttemp, addMatch }) => {
    return (
      <ul>
        <div id = "cards-container">
          <div id = "cards-grid">
            <img id = "card" src={route+words[0].imageSrc} alt={words.word} onClick={() => (handleClickedImage(0, rightChoice, addMatch), playSelectSound(), addAttemp())} style={{ cursor: 'pointer' }}></img>
            <img id = "card" src={route+words[1].imageSrc} alt={words.word} onClick={() => (handleClickedImage(1, rightChoice, addMatch), playSelectSound(), addAttemp())} style={{ cursor: 'pointer' }}></img>
            <img id = "card" src={route+words[2].imageSrc} alt={words.word} onClick={() => (handleClickedImage(2, rightChoice, addMatch), playSelectSound(), addAttemp())} style={{ cursor: 'pointer' }}></img>
          </div>
        </div>
      </ul>
    );  
};
