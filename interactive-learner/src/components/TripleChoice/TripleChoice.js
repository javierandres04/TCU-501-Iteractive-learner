import React from 'react';
import './TripleChoice.css';

const route = "../../.."

const handleClickedImage = (index, rightChoice, addMatch, playSelectSound, playMatchSound, matches, setShowChoices) => {
  console.log("HandleClick " + index);
  if(index === rightChoice) {
    playMatchSound();
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
export const TripleChoice = ({ selectedWords, matches, addMatch, addAttemp, playSelectSound, playMatchSound, setShowChoices}) => {
    return (
      <ul>
        <div>
          <div id='currentWord'>
            Current Word: {selectedWords[(selectedWords[3+matches*4])+matches*4].word}
          </div>
          <div id = "cards-container">
            <div id = "cards-grid">
              <img id = "card" src={route+selectedWords[0+matches*4].imageSrc} alt={selectedWords[0+matches*4].word} 
                onClick={() => (handleClickedImage(0, selectedWords[3+matches*4], addMatch, playSelectSound, playMatchSound, matches, setShowChoices), addAttemp())} style={{ cursor: 'pointer' }}>
              </img>
              <img id = "card" src={route+selectedWords[1+matches*4].imageSrc} alt={selectedWords[1+matches*4].word}
                onClick={() => (handleClickedImage(1, selectedWords[3+matches*4], addMatch, playSelectSound, playMatchSound, matches, setShowChoices), addAttemp())} style={{ cursor: 'pointer' }}>
              </img>
              <img id = "card" src={route+selectedWords[2+matches*4].imageSrc} alt={selectedWords[2+matches*4].word}
                onClick={() => (handleClickedImage(2, selectedWords[3+matches*4], addMatch, playSelectSound, playMatchSound, matches, setShowChoices), addAttemp())} style={{ cursor: 'pointer' }}>
              </img>
            </div>
          </div>
        </div>
      </ul>
    );  
};
