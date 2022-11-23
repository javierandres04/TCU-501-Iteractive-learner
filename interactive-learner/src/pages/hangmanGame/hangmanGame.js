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
import { BackButton } from '../../components/BackButton/BackButton';
import { HelpButton } from '../../components/HelpButton/HelpButton';

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

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [display, setDisplay] = useState('Display Keyboard');
  const [virtualLetter, setVirtualLetter] = useState('');

  useEffect(() => {
    setCorrectLetters(currentLetters => [...currentLetters, ' ']);
    document.getElementById('keyboard').style.display = 'none';
  }, []);

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
  }, [correctLetters, wrongLetters, playable, selectedWord, display]);

  useEffect(() => {

    if (selectedWord.includes(virtualLetter)) {
      if (!correctLetters.includes(virtualLetter)) {
        setCorrectLetters(currentLetters => [...currentLetters, virtualLetter]);
      } else {
        show(setShowNotification);
      }
    } else {
      if (!wrongLetters.includes(virtualLetter)) {
        setWrongLetters(currentLetters => [...currentLetters, virtualLetter]);
      } else {
        show(setShowNotification);
      }
    }

  }, [virtualLetter]);

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

  const displayKeyboard = () => {
    const element = document.getElementById('keyboard')
    element.style.display = (element.style.display === 'none' ? 'block' : 'none');
    setDisplay((display === 'Display Keyboard' ? 'Hide Keyboard' : 'Display Keyboard'));
  }

  const pressVirtualKey = (event) => {
    const char = event.target.dataset.char
    if (isLetter(char)) {
      setVirtualLetter(char.toLowerCase());
    }
  }

  const isLetter = (caracter) => {
    let ascii = caracter.toUpperCase().charCodeAt(0);
    return ascii > 64 && ascii < 91;
  };

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
              <div id='gameHeader'>
                <BackButton />
                <h1>Hangman Game</h1>
                <HelpButton />
              </div>
              <h5 id='selectedTheme'>
                <div>{selectedTheme}</div>
              </h5>
              <button onClick={playAgain}>New Game</button>
              <div id='centerContainer'>
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
              </div>
              <Word selectedWord={selectedWord} correctLetters={correctLetters} />
              <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playable={playable} />
              <Notification showNotification={showNotification} />

              <button onClick={displayKeyboard}>{display}</button>

              <div onClick={pressVirtualKey} id="keyboard">
                <div className="keyboard__row">
                  <div className="key--letter" data-char="Q">Q</div>
                  <div className="key--letter" data-char="W">W</div>
                  <div className="key--letter" data-char="E">E</div>
                  <div className="key--letter" data-char="R">R</div>
                  <div className="key--letter" data-char="T">T</div>
                  <div className="key--letter" data-char="Y">Y</div>
                  <div className="key--letter" data-char="U">U</div>
                  <div className="key--letter" data-char="I">I</div>
                  <div className="key--letter" data-char="O">O</div>
                  <div className="key--letter" data-char="P">P</div>

                </div>
                <div className="keyboard__row">
                  <div className="key--letter" data-char="A">A</div>
                  <div className="key--letter" data-char="S">S</div>
                  <div className="key--letter" data-char="D">D</div>
                  <div className="key--letter" data-char="F">F</div>
                  <div className="key--letter" data-char="G">G</div>
                  <div className="key--letter" data-char="H">H</div>
                  <div className="key--letter" data-char="J">J</div>
                  <div className="key--letter" data-char="K">K</div>
                  <div className="key--letter" data-char="L">L</div>
                </div>
                <div className="keyboard__row">
                  <div className="key--letter" data-char="Z">Z</div>
                  <div className="key--letter" data-char="X">X</div>
                  <div className="key--letter" data-char="C">C</div>
                  <div className="key--letter" data-char="V">V</div>
                  <div className="key--letter" data-char="B">B</div>
                  <div className="key--letter" data-char="N">N</div>
                  <div className="key--letter" data-char="M">M</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
      <Footer />
    </motion.div>
  );
};