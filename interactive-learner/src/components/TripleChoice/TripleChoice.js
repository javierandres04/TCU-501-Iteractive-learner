import React from 'react';
import './TripleChoice.css';

const route = "../../.."

const handleClickedImage = (index, rightChoice, addMatch, playSelectSound, matches, setShowChoices) => {
  console.log("HandleClick " + index);
  if(index === rightChoice) {
    if(matches == 7) {
      setShowChoices(false);
    }
    addMatch();
    console.log("\tRight choice selected");
  } else {
    playSelectSound();
    console.log("\tWrong choice selected");
  }
};

/**
 * Shows 3 options, increments attemps and matches 
 */
export const TripleChoice = ({ selectedWords, matches, addMatch, addAttemp, playSelectSound, setShowChoices}) => {
    return (
      <div id = "container">
        <div id='currentWord'>
          {selectedWords[(selectedWords[3+matches*4])+matches*4].word}
        </div>
        <div id = "cards-container">
          <div id = "cards-grid-tc">
            <img id = "card" src={route+selectedWords[0+matches*4].imageSrc} alt={selectedWords[0+matches*4].word} 
              onClick={() => (handleClickedImage(0, selectedWords[3+matches*4], addMatch, playSelectSound, matches, setShowChoices), addAttemp())} style={{ cursor: 'pointer' }}>
            </img>
            <img id = "card" src={route+selectedWords[1+matches*4].imageSrc} alt={selectedWords[1+matches*4].word}
              onClick={() => (handleClickedImage(1, selectedWords[3+matches*4], addMatch, playSelectSound, matches, setShowChoices), addAttemp())} style={{ cursor: 'pointer' }}>
            </img>
            <img id = "card" src={route+selectedWords[2+matches*4].imageSrc} alt={selectedWords[2+matches*4].word}
              onClick={() => (handleClickedImage(2, selectedWords[3+matches*4], addMatch, playSelectSound, matches, setShowChoices), addAttemp())} style={{ cursor: 'pointer' }}>
            </img>
          </div>
        </div>
      </div>
    );  
};
