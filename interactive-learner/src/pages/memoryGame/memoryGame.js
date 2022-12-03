import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import Swal from 'sweetalert2';
import '../../App.css';
import './memoryGame.css';
import { useState, useEffect } from 'react';
import { MemoryCard } from '../../components/MemoryCard/MemoryCard';
import { Themes } from '../../data/themes';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';


const spanishInstructions = [
  'En pantalla se muestran 12 cartas volteadas.',
  'El objetivo del juego es encontrar los 6 pares de cartas iguales.',
  'Para revelar el contenido de una carta basta con hacer click sobre ella.',
  'Esta se quedará visible hasta que se ejecute la siguiente jugada.',
  'Al revelar una segunda carta, si esta coincide con la primera, ambas se quedarán visibles, de lo contrario serán volteadas nuevamente.'
]
const englishInstructions = [
  'On the screen there are twelve flipped cards.',
  `The game's objective is to find all six card pairs.`,
  'Click on a card to reveal its content.',
  'The card will stay visible until the next move is performed.',
  `After revealing a second card, if they match, they will stay upwards, if they don't they will flip again.` 
]

const selectWords = (words) => {
  let options = [];
  let selectedWords = [];
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  options = options.slice(0, 6);

  for (let i = 0; i < 6; i++) {
    selectedWords[i] = words[options[i]];
  }
  return selectedWords;
}


export const MemoryGame = () => {
  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words));
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [lastWordFound, setLastWordFound] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  let cardImgs = [
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
  ];

  const playSound = (soundName) => {
    let sound = new Audio(`./sounds/${soundName}.m4a`);
    sound.play();
  }

  const shuffleCards = () => {
    setSelectedWords(selectWords(words));
    if (selectedWords) {
      for (let i = 0; i < cardImgs.length; i++) {
        cardImgs[i].src = selectedWords[i].imageSrc;
        cardImgs[i].word = selectedWords[i].word;

      }
      const shuffledCards = [...cardImgs, ...cardImgs]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

      setChoiseOne(null);
      setChoiseTwo(null);
      setCards(shuffledCards);
      setTurns(0);
      setLastWordFound('');
    }
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setLastWordFound(choiseOne.word);
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

  useEffect(() => {
    shuffleCards();
  }, [])

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }


  const cardIsMatched = (card) => {
    return card.Matched === true;
  }

  const allCardsMatched = () => {
    return cards.every(cardIsMatched);
  }

  useEffect(() => {
    if (allCardsMatched() && turns > 0) {
      Swal.fire({
        title: 'Congratulations, you win!!!',
        text: 'You made ' + turns + ' attempts.',
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
    }
  }, [cards])

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
      <Header title={'Memory Game'} />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
            <div id='stats'>
              <div> Last word found: {lastWordFound} </div>
              <div id='attempts'>Attempts: {turns}</div>
            </div>
            <div id='cards-grid'>
              {cards.map(card => (
                <MemoryCard
                  key={card.id}
                  card={card}
                  handleChoise={handleChoise}
                  flipped={card === choiseOne || card === choiseTwo || card.Matched}
                  disabled={disabled}
                />
              ))
              }
            </div>
            <button onClick={shuffleCards}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};