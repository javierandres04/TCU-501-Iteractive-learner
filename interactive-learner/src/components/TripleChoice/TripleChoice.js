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

const randomizeOptions  = (words, selectedWords, rightChoice, setRightChoice, matches) => {
  console.log("Selected Words: ");
  console.log(selectedWords);
  let randomChoices = []
  let options = [];
  setRightChoice(Math.floor(Math.random() * 3)); // position in which the right choice is
  options = options.slice(0, 2);
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  options = options.slice(0, 2);
  let currentOption = 0;
  for (let i = 0; i < 3; i++) {
    if(rightChoice == i) {
      randomChoices[i] = selectedWords[matches];
    } else {
      randomChoices[i] = words[options[currentOption]];
      ++currentOption;
    }
  }
  console.log("Right choice position "+ rightChoice +"\n\tRandom choices: ");
  console.log(randomChoices);
  return randomChoices;
}

/**
 * Receives an array of 3 image routes and a number for the right choice
 */
export const TripleChoice = ({ words, selectedWords, rightChoice, setRightChoice, playSelectSound, addAttemp, addMatch, matches }) => {
  let randomChoices = randomizeOptions(words[0], selectedWords, rightChoice, setRightChoice, matches);
    return (
      <ul>
        <div id='currentWord'>Current Word: {randomChoices[rightChoice].word}</div>
        <div id = "cards-container">
          <div id = "cards-grid">
            <img id = "card" src={route+randomChoices[0].imageSrc} alt={randomChoices[0].word} onClick={() => (handleClickedImage(0, rightChoice, addMatch), playSelectSound(), addAttemp())} style={{ cursor: 'pointer' }}></img>
            <img id = "card" src={route+randomChoices[1].imageSrc} alt={randomChoices[1].word} onClick={() => (handleClickedImage(1, rightChoice, addMatch), playSelectSound(), addAttemp())} style={{ cursor: 'pointer' }}></img>
            <img id = "card" src={route+randomChoices[2].imageSrc} alt={randomChoices[2].word} onClick={() => (handleClickedImage(2, rightChoice, addMatch), playSelectSound(), addAttemp())} style={{ cursor: 'pointer' }}></img>
          </div>
        </div>
      </ul>
    );  
};
