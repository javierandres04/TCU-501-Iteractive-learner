import Swal from 'sweetalert2';
import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import { Themes } from '../../data/themes';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';
import { ConfettiRain } from '../../components/ConfettiRain/ConfettiRain';
import './dragAndDropGame.css';
import '../../App.css';
import { DragImages } from '../../components/DragImages/DragImages';
import { DropImages } from '../../components/DropImages/DropImages';
import { Timer } from '../../components/Timer/Timer';

const spanishInstructions = [
  'En la parte de arriba se muestran 8 imágenes  diferentes.',
  'En la parte de abajo se muestran 8 palabras que se asocian con las imágenes de arriba.',
  'Las imágenes se pueden arrastrar hacia el icono de imagen que está arriba de las palabras.',
  'Cuando se arrastra una imagen a la posición donde está la palabra que la describe la imagen no regresa a su posición original.',
  'Si se arrastra una imagen a una posición que no es la correcta, la imagen volverá a su posición original.',
  'El objetivo es asociar las 8 imágenes con las 8 las palabras que las describen.'
]
const englishInstructions = [
  'At the top there are 8 different images',
  'At the bottom there are 8 words that are associated with the images above.',
  'Images can be dragged into the image icon above the words.',
  'When an image is dragged to the position where the word that describes it is, the image does not return to its original position.',
  'If an image is dragged to a position that is not correct, the image will return to its original position.',
  'The objective is to associate the 8 images with the 8 words that describe them.'
]

/** Using sound effect "Success Fanfare Trumpets" from freesound.org
  * https://freesound.org/people/FunWithSound/sounds/456966/
  * created by user: FunWithSound
  */
const playVictorySound = () => {
  let sound = new Audio(`./sounds/SoundEffects/Success-Fanfare-Trumpets.mp3`);
  sound.play();
}

/** 
  * Using sound effect "UI Click" from freesound.org
  * https://freesound.org/people/EminYILDIRIM/sounds/536108/
  * created by user: EminYILDIRIM
  */
const playSelectSound = () => {
  let sound = new Audio(`./sounds/SoundEffects/ui-click.wav`);
  sound.play();
}

/**
  * Using sound effect "dbl click" from freesound.org
  * https://freesound.org/people/7778/sounds/202312/
  * created by user: 7778
  */
const playMatchSound = () => {
  let sound = new Audio(`./sounds/SoundEffects/dbl-click.mp3`);
  sound.play();
}

/**
 * This method selects a random array of 8 words from the list the contains
 * all the vocabulary of the selected theme
 * @param {*Array of words all words from a given theme from which the 8 words are selected} words 
 * @returns {*Array with the selected 8 images}
 */
const selectWords = (words) => {
  let options = [];
  let selectedWords = [];
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  options = options.slice(0, 8);

  for (let i = 0; i < 8; i++) {
    selectedWords[i] = words[options[i]];
  }
  console.log("selectedWords");
  console.log(selectedWords);
  return selectedWords;
}

/**
 * Shuffles the 8 stops randomly
 * ref:https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
 * @param {*Array to be shuffles} array 
 * @returns shuffled array
 */
const shuffleArray = (array) => {
  let newArray = [];
  for (let k = 0;  array.length > k; k++){
    newArray[k] = array[k];
  }
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

export const DragAndDropGame = () => {
  const theme = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const words = useState(Themes.find(element => element.name === theme[0]).words);
  const selectedWords = useState(selectWords(words[0]));
  const shuffledWords = useState(shuffleArray(selectedWords[0]));
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  useEffect(() => {
    if (matches > 0) {
      playMatchSound();
    }
  }, [matches])

  useEffect(() => {
    if (matches === 8) {
      setGameIsOver(true);
      setGameWin(true);
      playVictorySound()
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        html:
        `Attemps: <b>${turns}</b>` +
        '<br></br>'+
        `<h6 style="text-align:left;padding-left: 120px;">Minutes: <b>${minutes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> Seconds: <b>${seconds}</b><h6>`,
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
    }
  }, [matches, turns])

  const refresh = () => window.location.reload(true);
  
  const addAttemp = (e) => {
    setTurns(turns+1);
  }

  const addMatch = (e) => {
    setMatches(matches+1);
    console.log("Number of matches: "+matches)
  }

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <HelpModal
        isHelpModalOpen={isHelpModalOpen}
        setIsHelpModalOpen={setIsHelpModalOpen}
        englishInstructions={englishInstructions}
        spanishInstructions={spanishInstructions}
      />
      {gameWin && <ConfettiRain />}
      <Header title={'Drag and Drop'} />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='dragAndDropGameContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
            <h5> Time </h5>
            <Timer
              stopTimer={gameIsOver}
              seconds={seconds}stats
              setSeconds={setSeconds}
              minutes={minutes}
              setMinutes={setMinutes}
            />
            <DragImages words={selectedWords[0]} playSelectSound = {playSelectSound} addAttemp={addAttemp} addMatch = {addMatch}>
            </DragImages>
            <div id='middle-line'></div>
            <DropImages words={shuffledWords[0]} turns={turns}>
            </DropImages>
            <div id='stats-dd'>
              <div>Attempts: {turns}</div>
            </div>
            <button onClick={refresh}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};