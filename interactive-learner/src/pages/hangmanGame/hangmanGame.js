import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';

import '../../App.css';
import './hangmanGame.css';

import Figure from '../../components/HangmanComponents/Figure';
import WrongLetters from '../../components/HangmanComponents/WrongLetters';
import Word from '../../components/HangmanComponents/Word';
import Popup from '../../components/HangmanComponents/PopUp';
import Notification from '../../components/HangmanComponents/Notification';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


export const HangmanGame = () => {

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
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
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  function show (setter) {
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
              <p>Find the hidden word - Enter a letter</p>
              <button onClick={playAgain}>New Game</button>
              <div id='centerContainer'>
              <Figure wrongLetters={wrongLetters} />
              <WrongLetters wrongLetters={wrongLetters} />
              </div>
              <Word selectedWord={selectedWord} correctLetters={correctLetters} />
              <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable}/>
              <Notification showNotification={showNotification} />
            </div>
          </div>
        </div>
      </>
      <Footer />
    </motion.div>
  );
};