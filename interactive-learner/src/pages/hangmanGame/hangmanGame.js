import { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { Themes } from '../../data/themes';
import { useSelector } from 'react-redux';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { ConfettiRain } from '../../components/ConfettiRain/ConfettiRain';
import { Timer } from '../../components/Timer/Timer';
import WrongLetters from '../../components/HangmanComponents/WrongLetters';
import Word from '../../components/HangmanComponents/Word';
import Popup from '../../components/HangmanComponents/PopUp';
import Notification from '../../components/HangmanComponents/Notification';
import Figure from '../../components/HangmanComponents/Figure';
import Swal from 'sweetalert2';
import './hangmanGame.css';
import '../../App.css';

import { HelpModal } from '../../components/HelpModal/HelpModal';

const spanishInstructions = [
  'En la pantalla se muestran el dibujo del ahorcado, la sección de letras erróneas y la sección de la palabra a adivinar.',
  'El objetivo del juego es adivinar la palabra antes de que se complete el dibujo del ahorcado.',
  'Para jugar se presiona una letra.',
  'Si la letra es correcta, esta es revelada en la sección de la palabra.',
  'Si la letra es incorrecta, esta se agrega a la sección de letras incorrectas y se remarca una parte del dibujo del ahorcado.',
  'Existe un botón para desplegar un teclado con el que se puede jugar.'
]
const englishInstructions = [
  'The drawing of the hangman, the section of wrong letters, and the section of the word to guess are shown on the screen.',
  `The game's objective is to guess the word before the hangman drawing is complete.`,
  'To play, press a letter.',
  'If the letter is correct, it is revealed in the word section.',
  'If the letter is incorrect, it is added to the incorrect words section and a part of the hangman drawing is highlighted.',
  'There is a button to bring up a keyboard that can be played with.'
]

const selectWord = (words) => {
  return words[Math.floor(Math.random() * words.length)].word;
}

export const HangmanGame = () => {

  const [theme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWord, setSelectedWord] = useState(selectWord(words));
  const [gameWin, setGameWin] = useState(false);
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [display, setDisplay] = useState('Display Keyboard');
  const [virtualLetter, setVirtualLetter] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setCorrectLetters(currentLetters => [...currentLetters, ' ']);
    document.getElementById('keyboard').style.display = 'none';
  }, []);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.toLowerCase().includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
            Swal.fire({
              icon: 'error',
              title: 'Try another letter!',
              timer: 1500,
              showConfirmButton: false,
              heightAuto: false
            })
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

    if (selectedWord.toLowerCase().includes(virtualLetter)) {
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

  const refresh = () => window.location.reload(true);


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
      <Header title={'Hangman'} />
      <>
        <div id="bodyContainer">
          <div id="mainBox" >
            <div id="hangameContainer">
              <HeadGames
                setIsHelpModalOpen={setIsHelpModalOpen}
              />
              <br />
              <h5> Time </h5>
              <Timer
                stopTimer={gameWin}
                seconds={seconds}
                setSeconds={setSeconds}
                minutes={minutes}
                setMinutes={setMinutes}
              />
              <br />
              {gameWin && <ConfettiRain />}
              <div id='centerContainer'>
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
              </div>
              <Word
                selectedWord={selectedWord.toLowerCase()}
                correctLetters={correctLetters}
              />
              <Popup
                correctLetters={correctLetters}
                wrongLetters={wrongLetters}
                selectedWord={selectedWord}
                setPlayable={setPlayable}
                playable={playable}
                setGameWin={setGameWin}
                minutes={minutes}
                seconds={seconds}
              />
              <Notification showNotification={showNotification} />

              <button id='keyboardButton' onClick={displayKeyboard}>{display}</button>

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
                  <div className="key--letter" data-char="A">A</div>
                  <div className="key--letter" data-char="S">S</div>
                  <div className="key--letter" data-char="D">D</div>
                  <div className="key--letter" data-char="F">F</div>
                  <div className="key--letter" data-char="G">G</div>
                  <div className="key--letter" data-char="H">H</div>
                  <div className="key--letter" data-char="J">J</div>
                  <div className="key--letter" data-char="K">K</div>
                  <div className="key--letter" data-char="L">L</div>
                  <div className="key--letter" data-char="Z">Z</div>
                  <div className="key--letter" data-char="X">X</div>
                  <div className="key--letter" data-char="C">C</div>
                  <div className="key--letter" data-char="V">V</div>
                  <div className="key--letter" data-char="B">B</div>
                  <div className="key--letter" data-char="N">N</div>
                  <div className="key--letter" data-char="M">M</div>
                </div>
              </div>
              <button onClick={refresh}>New Game</button>

            </div>
          </div>
        </div>
      </>
      <Footer />
    </motion.div>
  );
};