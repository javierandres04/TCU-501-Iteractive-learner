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
import { TripleChoice } from '../../components/TripleChoice/TripleChoice';
import { Timer } from '../../components/Timer/Timer';

const spanishInstructions = [
  'Presiona el botón de nueva partida para iniciar el juego.',
  'En cada ronda se presentan 3 imágenes de las cuales solo 1 representa la palabra de arriba.',
  'Cada click en una imagen es un intento.',
  'Si el jugador da click sobre la imagen correcta se avanza a la siguiente ronda y aumenta el número de aciertos.',
  'El juego se gana cuando se completan 8 rondas.',
  'El objetivo es completarlo en el menor número de intentos.'
]
const englishInstructions = [
  'Press the New Game button to start the game.',
  'In each round 3 images are presented of which only 1 represents the word above.',
  'Every click on an image is an attempt.',
  'If the player clicks on the correct image, they advance to the next round and the number of matches increases.',
  'The game is won when 8 rounds are completed.',
  'The objective is to complete it in the fewest number of attempts.'
]

/** 
  * Using sound effect "Success Fanfare Trumpets" from freesound.org
  * https://freesound.org/people/FunWithSound/sounds/456966/
  * created by user: FunWithSound
 */
const playVictorySound = () => {
  let sound = new Audio(`./sounds/SoundEffects/Success-Fanfare-Trumpets.mp3`);
  sound.play();
}

/**
  * Using sound effect "Correct and Incorrect Chime" from freesound.org
  * https://freesound.org/people/LaurenPonder/sounds/639432/
  * created by user: LaurenPonder
 */
const playSelectSound = () => {
  let sound = new Audio(`./sounds/SoundEffects/incorrect-chime.mp3`);
  sound.play();
}

/**
  * Using sound effect "Correct Choice" from freesound.org
  * https://freesound.org/people/unadamlar/sounds/476178/
  * created by user: unadamlar
*/
const playMatchSound = () => {
  let sound = new Audio(`./sounds/SoundEffects/correct-choice.wav`);
  sound.play();
}

/**
 * This method selects a random array of 8 words from the list the contains
 * all the vocabulary of the selected theme. Each word is the right choice
 * of his own turn.
 * @param {*Array of words from which the right choices are selected} words 
 * @returns {*Array with the 8 right choices for each turn or round}
 */
const getRightChoices = (words) => {
  let selectedWords = [];
  let options = [];
  for (let i = 0; i < words[0].length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  options = options.slice(0, 8);
  for (let i = 0; i < 8; i++) {
    selectedWords[i] = words[0][options[i]];
  }
  return selectedWords;
}

/**
 * Gets a random word from the word list of a theme and checks
 * that the word is not already in the selectedList. If the word
 * is already in the list, another word is randomly selected and
 * checked again
 * @param {*List of words that can't be repeated} alreadySelected 
 * @param {*List of all words of a given theme} words 
 * @returns A not repeated word
 */
const getRandomWord = (alreadySelected, words) => {
  let word = "";
  let isNewWord = false;
  let position = 0;
  while (!isNewWord) {
    position = Math.floor(Math.random() * words[0].length);
    word = words[0][position];
    isNewWord = true;
    for (let i = 0; i < alreadySelected.length; i++) {
      if(word === alreadySelected[i]) {
        i = alreadySelected.length;
        isNewWord = false;
      }
    }
  }
  return word;
}

/**
 * Prints in a readeable format the words for a given game
 * @param {All the options of words for all rounds} gameOptions 
 */
const printGameOptions = (gameOptions) => {
  for (let i = 0; i < 9; i++) {
    console.log((i+1)+" - Right choice is [" + gameOptions[3+4*i] + "]");
    for (let pos = 0; pos < 3; pos++) {
      console.log("\tWord "+pos+": "+gameOptions[pos+4*i].word);
    }
  }
}

/**
 * Generates all the options for a given game of chooseBetween. For each round
 * selects 2 wrong options to be along side the right choice. 
 * @param {*The list of 8 words that are the right choices for each round} rightChoices 
 * @param {*The list of all words of a given theme} words 
 * @returns All the options for each round of a single game of choose Between
 */
const makeGameOptions = (rightChoices, words) => {
  let rightChoicePosition = 0;
  let gameOptions = [];
  for (let currentPosition = 0; currentPosition < 8; currentPosition++) {
    rightChoicePosition = Math.floor(Math.random() * 3); // position in which the right choice is
    let randomChoices = [4];
    randomChoices[rightChoicePosition] = rightChoices[currentPosition];
    for (let i = 0; i < 3; i++) {
      if(rightChoicePosition !== i) {
        randomChoices[i] = getRandomWord(randomChoices, words);
      }
    }
    randomChoices[3] = rightChoicePosition;
    for (let i = 0; i < 4; i++) {
      gameOptions[i + currentPosition*4] = randomChoices[i];
    }
    if (currentPosition === 7) {
      for (let i = 0; i < 4; i++) {
        i === 3 ? gameOptions[i + (1+currentPosition)*4] = 0 : 
        gameOptions[i + (1+currentPosition)*4] = "extra_space";
      }
    }
  }
  printGameOptions(gameOptions);
  return gameOptions;
}

/**
 * Gets the random set of wrong and right choices, sets all the variables
 * to 0 or their required boolean state
 * @param {*List of all the words of a given theme} words 
 * @param {*Routine that sets the variable selectedWords} setSelectedWords 
 * @param {*Routine that sets the variable showChoices} setShowChoices 
 * @param {*Routine that sets the variable turns} setTurns 
 * @param {*Routine that sets the variable matches} setMatches 
 * @param {*Routine that sets the variable gameIsOver} setGameIsOver 
 * @param {*Routine that sets the variable gameWin} setGameWin 
 */
const startGame = (words, setSelectedWords, setShowChoices, setTurns, setMatches, setGameIsOver, setGameWin, setVictoryActivated) => {
  let rightChoices = getRightChoices(words);
  setSelectedWords(makeGameOptions(rightChoices, words));
  setGameWin(true);
  setTurns(0);
  setMatches(0);
  setGameWin(false);
  setGameIsOver(false);
  setShowChoices(true);
  setVictoryActivated(false);
}

export const ChooseBetweenGame = () => {
  const theme = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const words = useState(Themes.find(element => element.name === theme[0]).words);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [victoryActivated, setVictoryActivated] = useState(false);

  useEffect(() => {
    if (matches > 0) {
      playMatchSound();
    }
  }, [matches])

  useEffect(() => {
    if (matches === 8) {
      if (victoryActivated === false) {
        setVictoryActivated(true);
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
    }
  }, [matches, turns, minutes, seconds])

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
          <div id='chooseBetweenContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
              <h5> Time </h5>
              <Timer
                stopTimer={gameIsOver}
                seconds={seconds}
                setSeconds={setSeconds}
                minutes={minutes}
                setMinutes={setMinutes}
              />
              <div id='tripleChoice'>
                { showChoices ?
                    <TripleChoice 
                      words = {words}
                      selectedWords={selectedWords}
                      matches = {matches}
                      addMatch = {addMatch}
                      addAttemp = {addAttemp}
                      playSelectSound = {playSelectSound}
                      setShowChoices={setShowChoices}>
                    </TripleChoice>
                  :
                  <div>
                    <div>
                      <div id = "currentWord"> Press New Game to Play </div>
                      <div id = "cards-container">
                        <div id = "cards-grid-tc">
                          <img id = "card" src={"../../../images/question_mark.png"} alt = "error">
                          </img>
                          <img id = "card" src={"../../../images/question_mark.png"} alt = "error">
                          </img>
                          <img id = "card" src={"../../../images/question_mark.png"} alt = "error">
                          </img>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            <div id='stats'>
              <div id='attempts'>Attempts: {turns}</div>
              <div id='attempts'>Matches: {matches}</div>
            </div>
            {gameIsOver ?
              <button onClick={() => {startGame(words, setSelectedWords, setShowChoices, setTurns, setMatches, setGameIsOver, setGameWin, setVictoryActivated)}}>New Game</button>
            :
              <button onClick={() => {setGameIsOver(true); setShowChoices(false)}}>Stop Game</button>
            }
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};