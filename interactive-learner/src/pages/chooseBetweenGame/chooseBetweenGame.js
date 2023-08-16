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
import './chooseBetweenGame.css';
import '../../App.css';
import { DragImages } from '../../components/DragImages/DragImages';
import { DropImages } from '../../components/DropImages/DropImages';

const spanishInstructions = [
  'TODO'
]
const englishInstructions = [
  'TODO'
]

/** Using sound effect "Success Fanfare Trumpets" from freesound.org
   * https://freesound.org/people/FunWithSound/sounds/456966/
   * created by user: FunWithSound
  */
const playVictorySound = () => {
  let sound = new Audio(`./sounds/SoundEffects/Success-Fanfare-Trumpets.mp3`);
  sound.play();
}

/** Using sound effect "UI Click" from freesound.org
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

// ref:https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
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

export const ChooseBetweenGame = () => {
  const theme = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const words = useState(Themes.find(element => element.name === theme[0]).words);
  const selectedWords = useState(selectWords(words[0]));
  const shuffledWords = useState(shuffleArray(selectedWords[0]));
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  // const [seconds, setSeconds] = useState(0);
  // const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (matches > 0) {
      playMatchSound();
    }
  }, [matches])

  useEffect(() => {
    if (matches === 8) {
      setGameWin(true);
      playVictorySound()
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        text: 'You made ' + turns + ' attempts.',
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
      <Header title={'Choose Between'} />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
            <DragImages words={selectedWords[0]} playSelectSound = {playSelectSound} addAttemp={addAttemp} addMatch = {addMatch}>
            </DragImages>
            <DropImages words={shuffledWords[0]} turns={turns}>
            </DropImages>
            <div id='stats'>
              <div id='attempts'>Attempts: {turns}</div>
            </div>
            <button onClick={refresh}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};