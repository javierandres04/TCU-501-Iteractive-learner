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

// TODO: instructions
const spanishInstructions = [
  ''
]
const englishInstructions = [
  ''
]

// TODO: adjust the number of words selected by this function
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

export const DragAndDropGame = () => {
  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words));
  const [shuffledWords, setShuffledWords] = useState(shuffleArray(selectedWords));
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [transferData, setTransferData] = useState("Cuco");
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);


  const playSound = (soundName) => {
    let sound = new Audio(`./sounds/${soundName}.m4a`);
    sound.play();
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        Swal.fire({
          title: 'Good Work! 😃',
          text: `...this word is: ${choiseOne.word}`,
          timer: 2100,
          showConfirmButton: false,
          heightAuto: false
        })
        playSound(choiseOne.word)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiseOne.src) {
              return { ...card, Matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo])

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  useEffect(() => {
    if (matches == 8) {
      setGameWin(true);
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        text: 'You made ' + turns + ' attempts.',
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
    }
  })

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
          <div id='memoryGameContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
            <DragImages words={selectedWords} addAttemp={addAttemp} addMatch = {addMatch}>
            </DragImages>
            <DropImages words={shuffledWords}>
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