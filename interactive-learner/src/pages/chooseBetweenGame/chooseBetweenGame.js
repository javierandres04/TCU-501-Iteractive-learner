import Swal from 'sweetalert2';
import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useState, useEffect, Button } from 'react';
import { Themes } from '../../data/themes';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';
import { ConfettiRain } from '../../components/ConfettiRain/ConfettiRain';
import './chooseBetweenGame.css';
import '../../App.css';
import { TripleChoice } from '../../components/TripleChoice/TripleChoice';

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

const selectRightChoices = (words) => {
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
 * Gets a not repeated word
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

const printGameOptions = (gameOptions) => {
  for (let i = 0; i < 9; i++) {
    console.log((i+1)+" - Right choice is [" + gameOptions[3+4*i] + "]");
    for (let pos = 0; pos < 3; pos++) {
      console.log("\tWord "+pos+": "+gameOptions[pos+4*i].word);
    }
  }
}

const makeGameOptions = (rightChoices, words) => {
  let rightChoicePosition = 0;
  let gameOptions = [];
  for (let currentPosition = 0; currentPosition < 8; currentPosition++) {
    rightChoicePosition = Math.floor(Math.random() * 3); // position in which the right choice is
    let randomChoices = [];
    for (let i = 0; i < 3; i++) {
      if(rightChoicePosition == i) {
        randomChoices[i] = rightChoices[currentPosition];
      } else {
        randomChoices[i] = getRandomWord(randomChoices, words);
      }
    }
    randomChoices[3] = rightChoicePosition;
    for (let i = 0; i < 4; i++) {
      gameOptions[i + currentPosition*4] = randomChoices[i];
    }
    if (currentPosition == 7) {
      for (let i = 0; i < 4; i++) {
        i == 3 ? gameOptions[i + (1+currentPosition)*4] = 0 : 
        gameOptions[i + (1+currentPosition)*4] = "extra_space";
      }
    }
  }
  printGameOptions(gameOptions);
  return gameOptions;
}


const selectChoices = (words, setSelectedWords, setShowChoices, setTurns, setMatches) => {
  let rightChoices = selectRightChoices(words);
  setSelectedWords(makeGameOptions(rightChoices, words));
  setTurns(0);
  setMatches(0);
  setShowChoices(true);
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
          <div id='chooseBetweenContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
                <div id='tripleChoice'>
                  { showChoices ?
                      <TripleChoice 
                        words = {words}
                        selectedWords={selectedWords}
                        matches = {matches}
                        addMatch = {addMatch}
                        addAttemp={addAttemp}
                        playSelectSound = {playSelectSound}
                        playMatchSound = {playMatchSound}
                        setShowChoices={setShowChoices}>
                      </TripleChoice>
                    :
                    <div>
                      <div>
                        <div id = "currentWord"> "Press New Game to Play" </div>
                        <div id = "cards-container">
                          <div id = "cards-grid">
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
            <button onClick={() => selectChoices(words, setSelectedWords, setShowChoices, setTurns, setMatches)}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};