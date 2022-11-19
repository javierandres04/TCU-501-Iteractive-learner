import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';

import '../../App.css';
import './hangmanGame.css';
import { Themes } from '../../data/themes';
import { useSelector } from 'react-redux';

import Figure from '../../components/HangmanComponents/Figure';
import WrongLetters from '../../components/HangmanComponents/WrongLetters';
import Word from '../../components/HangmanComponents/Word';
import Popup from '../../components/HangmanComponents/PopUp';
import Notification from '../../components/HangmanComponents/Notification';

const selectWord = (words) => {
  return words[Math.floor(Math.random() * words.length)].word.toLowerCase();
}

export const HangmanGame = () => {

  const selectedTheme = `${useSelector((state) => state.theme.selectedTheme.Grade)}
  - ${useSelector((state) => state.theme.selectedTheme.Unit)}
  - ${useSelector((state) => state.theme.selectedTheme.Theme)}`;

  const [theme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWord, setSelectedWord] = useState(selectWord(words));
  
  const [playable, setPlayable] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setCorrectLetters(currentLetters => [...currentLetters, ' ']);
  },[]);

  useEffect(() => {
    console.log(selectedWord);
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable, selectedWord]);


  const playAgain = () => {
    // Empty Arrays
    setCorrectLetters([]);
    setCorrectLetters(currentLetters => [...currentLetters, ' ']);

    setWrongLetters([]);

    setPlayable(true);

    setSelectedWord(selectWord(words));

  }

  const show = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2000);
  }

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <Header />
      <>
        <div id="bodyContainer">
          <div id="mainBox" >
            <div id="hangameContainer">
              <h1>Hangman</h1>
              <h5 id='selectedTheme'>
                <div>{selectedTheme}</div>
              </h5>
              <button onClick={playAgain}>New Game</button>
              <div id='centerContainer'>
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
              </div>
              <Word selectedWord={selectedWord} correctLetters={correctLetters} />
              <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} />
              <Notification showNotification={showNotification} />
            </div>
          </div>
        </div>
      </>
      <Footer />
    </motion.div>
  );
};