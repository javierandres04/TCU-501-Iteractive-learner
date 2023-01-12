import { Soup } from 'letters-soup';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Themes } from '../../data/themes';
import '../../App.css';
import './wordSearchGame.css';
import { useSelector } from 'react-redux';
import { LettersTable } from '../../components/LetterSoupComponents/LettersTable';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';


const englishInstructions = [''];
const spanishInstructions = [''];

const numberOfWords = 5;
const tableSize = 10;

const selectWords = (words, cantWords) => {
  let options = [];
  let selectedWords = [];
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  if (cantWords > words.length) {
    cantWords = words.length;
  }
  options = options.slice(0, cantWords);

  for (let i = 0; i < cantWords; i++) {
    selectedWords[i] = words[options[i]].word;
  }
  return selectedWords;
}


export const WordSearchGame = () => {
  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words, numberOfWords));
  const [initialLetter, setInitialLetter] = useState();
  const [finalLetter, setFinalLetter] = useState();
  const [foundWords, setFoundWords] = useState([]);
  const [soup, setSoup] = useState(new Soup(selectedWords, tableSize));
  const [board, setBoard] = useState(soup.generate());
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  console.log(soup.getSolution());
  const detectWord = (event) => {
    let text = event.target.textContent;
    console.log(event.target);
    // console.log(text.length, event.type, text , text.match(/[a-zA-Z]/));
    if (text.length === 1 && text.match(/[a-zA-Z]/)) {
      if (event.type === 'mousedown') {
        setInitialLetter({ letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col) });
      } else if (event.type === 'mouseup') {
        setFinalLetter({ letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col) });
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', detectWord);
    document.addEventListener('mouseup', detectWord);
  }, []);

  useEffect(() => {
    console.log(initialLetter, finalLetter);
    if (finalLetter !== undefined) {
      findWord();
    }
  }, [finalLetter]);

  useEffect(() => {
    if(foundWords.length === selectedWords.length) {
      console.log('Juego terminado');
    }
  },[foundWords])


  const findWord = () => {

    let filResult = Math.abs(initialLetter.fil - finalLetter.fil);
    let ColResult = Math.abs(initialLetter.col - finalLetter.col);
    let wordLenght = (filResult >= ColResult ? filResult : ColResult);

    let buildedWord = '';
    let currentFil = initialLetter.fil;
    let currentCol = initialLetter.col;

    initialLetter.col--;
    for (let i = 0; i <= wordLenght; i++) {
      buildedWord += board[currentFil][currentCol].content;
      console.log(currentFil, currentCol)
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

    console.log(buildedWord, selectedWords);

    if (foundWords.find(word => word.toLowerCase() === buildedWord.toLowerCase()) === undefined) {
      selectedWords.forEach(element => {
        if (buildedWord.toLowerCase() == element.toLowerCase()) {
          setFoundWords([...foundWords, buildedWord.toLowerCase()]);
          console.log(foundWords);
        }
      });
    }
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
      <Header />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <HeadGames
              setIsHelpModalOpen={setIsHelpModalOpen}
            />
            <h1>Word Search Game</h1>
            <div id='wordSearchGame'>
              <LettersTable tamTable={10} table={board} />
              <div id='wordsToFind'>
                <h3> Words to Find</h3>
                {selectedWords.map((word, id) =>
                  foundWords.find(element => element.toLowerCase() === word.toLowerCase()) ? <strike key={id}> {word} </strike> :
                    <p key={id}> {word} </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

