import { Soup } from 'letters-soup';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Themes } from '../../data/themes';
import { useSelector } from 'react-redux';
import { LettersTable } from '../../components/LetterSoupComponents/LettersTable';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';
import { Timer } from '../../components/Timer/Timer';
import { ConfettiRain } from '../../components/ConfettiRain/ConfettiRain';
import '../../App.css';
import './wordSearchGame.css';


const englishInstructions = [
  'There is a board on the screen filled with different letters.',
  'The objective is to find the words in the list at the right side of the board.',
  'To select a word, click and hold while scrolling through the entire word from beginning to end..',
  'If a word from the list is correctly selected on the board, it will be highlighted and crossed out from the word list.',
  'If the selected letters do not form a word in the list, the highlighted letters fade out and no word in the list is crossed out.',
  'Below the board there is a clock that shows how much time has passed since the game started.',
  'The game is completed by finding all the words on the list.'
  ];
const spanishInstructions = [
  'En la pantalla se muestra un tablero lleno de diferentes letras.',
  'El objetivo es encontrar las palabras que se muestran a la derecha del tablero.',
  'Para seleccionar una palabra se debe hacer click y mantener presionado mientras que se recorre toda la palabra de principio a fin.',
  'Si una palabra de la lista es seleccionada correctamente en el tablero, esta se resaltará y quedará tachada de la lista de palabras.',
  'Si las letras seleccinadas no forman una palabra de la lista, se desvanecen las letras resaltadas y no se tacha ninguna palabra de la lista.',
  'Debajo del tablero esta un reloj que marca cuanto tiempo ha pasado desde que empezó la partida.',
  'El juego se completa al encontrar todas las palabras de la lista.'
  ];

const numberOfWords = 6;
const tableSize = 12;

const selectWords = (words, cantWords) => {
  let options = [];
  let selectedWords = [];
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  let wordCounter = 0;
  options.map(wordIndex => {
    if(words[wordIndex].word.length <= tableSize && wordCounter < numberOfWords) {
      selectedWords[wordCounter] = words[wordIndex].word;
      wordCounter += 1
    }
  });
  return selectedWords;
}



const playSound = (soundName) => {
  let sound = new Audio(`./sounds/${soundName}.m4a`);
  sound.play();
}

export const WordSearchGame = () => {
  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words, numberOfWords));
  const [boardWords, setBoardWords] = useState(selectedWords.map(word => word.split(' ').join('')));
  const [initialLetter, setInitialLetter] = useState();
  const [finalLetter, setFinalLetter] = useState();
  const [foundWords, setFoundWords] = useState([]);
  const [soup, setSoup] = useState(new Soup(boardWords, tableSize));
  const [board, setBoard] = useState(soup.generate());
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [wordIsFound, setWordIsFound] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  console.log(boardWords);
  const detectWord = (event) => {
    let text = event.target.textContent;
    if (text.length === 1 && text.match(/[a-zA-Z]/)) {
      if (event.type === 'mousedown' || event.type === 'touchstart') {
        setInitialLetter({ letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col) });
      } else if (event.type === 'mouseup') {
        setFinalLetter({ letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col) });
      } else if (event.type === 'touchmove') {
        event.preventDefault();
      } else if (event.type === 'touchend') {
        let element;
        const touch = [...event.changedTouches][0]
        element = document.elementFromPoint(touch.pageX, touch.pageY);
        setFinalLetter({ letter: element.textContent, fil: parseInt(element.dataset.fil), col: parseInt(element.dataset.col) });

      }
    }
  }

  useEffect(() => {
    document.getElementById('grid-container').addEventListener('mousedown', detectWord);
    document.getElementById('grid-container').addEventListener('mouseup', detectWord);
    document.getElementById('grid-container').addEventListener('touchstart', detectWord);
    document.getElementById('grid-container').addEventListener('touchend', detectWord);
    document.getElementById('grid-container').addEventListener('touchmove', detectWord);
  }, []);

  useEffect(() => {
    if (finalLetter !== undefined) {
      findWord();
    }
  }, [finalLetter]);

  useEffect(() => {
    if (foundWords.length === selectedWords.length) {
      Swal.fire({
        title: 'Congratulations! 😃',
        text: `You found all the words in ${minutes} minutes and ${seconds} seconds.`,
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
      setGameIsOver(true);
    }
  }, [foundWords])


  const findWord = () => {

    let filResult = Math.abs(initialLetter.fil - finalLetter.fil);
    let ColResult = Math.abs(initialLetter.col - finalLetter.col);
    let wordLenght = (filResult >= ColResult ? filResult : ColResult);
    let lettersCoordenates = [];
    let buildedWord = '';
    let currentFil = initialLetter.fil;
    let currentCol = initialLetter.col;

    initialLetter.col--;
    for (let i = 0; i <= wordLenght; i++) {
      buildedWord += board[currentFil][currentCol].content;
      lettersCoordenates.push({ r: currentFil, c: currentCol });
      if (currentFil > finalLetter.fil) {
        currentFil--;
      } else if (currentFil < finalLetter.fil) {
        currentFil++;
      }
      if (currentCol > finalLetter.col) {
        currentCol--;
      } else if (currentCol < finalLetter.col) {
        currentCol++;
      }
    }


    if (foundWords.find(word => word.toLowerCase() === buildedWord.toLowerCase()) === undefined ||
      foundWords.find(word => word.toLowerCase() === buildedWord.split("").reverse().join("").toLowerCase()) === undefined) {
      selectedWords.forEach(element => {
        if (buildedWord.toLowerCase() === element.toLowerCase().split(' ').join('') ||
          buildedWord.split("").reverse().join("").toLowerCase() === element.toLowerCase().split(' ').join('')) {
          if ((foundWords.find(word => word.toLowerCase() === element.toLowerCase().split(' ').join(''))) === undefined) {
            setFoundWords([...foundWords, element.toLowerCase().split(' ').join('')]);
            lettersCoordenates.map(element => document.getElementById(`${element.r}-${element.c}`).classList.add('grid-item-found'));
          }
          setWordIsFound(true);
          playSound(element);
        }
        if (wordIsFound === false) {
          lettersCoordenates.map(element => document.getElementById(`${element.r}-${element.c}`).classList.add('grid-item-selected'));
          setTimeout(() => {
            lettersCoordenates.map(element => document.getElementById(`${element.r}-${element.c}`).classList.remove('grid-item-selected'));
            setWordIsFound(false);
          }, 1200);

        }
      });
    }
  }
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
      {gameIsOver && <ConfettiRain />}
      <Header title={'WordSearch'} />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <HeadGames
              setIsHelpModalOpen={setIsHelpModalOpen}
            />
            <br />
            <div id='wordSearchGame'>
              <LettersTable tamTable={tableSize} table={board} />
              <div id='wordsToFind'>
                <h3> Words to Find</h3>
                {selectedWords.map((word, id) =>
                  foundWords.find(element => element.toLowerCase() === word.toLowerCase().split(' ').join('')) ? <strike key={id}> {word} </strike> :
                    <p key={id}> {word} </p>
                )}
              </div>
            </div>
            <br />
            <h5> Time </h5>
            <Timer
              stopTimer={gameIsOver}
              seconds={seconds}
              setSeconds={setSeconds}
              minutes={minutes}
              setMinutes={setMinutes}
            />
            <br />
            <button onClick={refresh}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

