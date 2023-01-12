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
  console.log(selectedWords);
  const [soup, setSoup] = useState(new Soup(selectedWords, tableSize));
  const [board, setBoard] = useState(soup.generate());
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);



  useEffect(() => {
    document.addEventListener('mousedown', detectWord);
    document.addEventListener('mouseup', detectWord);
  }, []);

  useEffect(() => {
    if (finalLetter !== undefined) {
      //findWord(); 
    }
  }, [finalLetter]);

  const detectWord = (event) => {
    let text = event.target.textContent;
    if (text.length === 1 && text.match(/[a-z]/)) {
      if (event.type == 'mousedown') {
        console.log('mousedown');
        setInitialLetter({ letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col) });
      } else if (event.type == 'mouseup') {
        console.log('initialLetter: ', initialLetter);
        console.log("mouseup");
        setFinalLetter({ letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col) });
      }
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
                  <p id={id}> {word} </p>
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

