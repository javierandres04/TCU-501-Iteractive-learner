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


  let cardImgs = [
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
    { "word": "", "src": "", "Matched": false },
  ];

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
          timer: 1200,
          showConfirmButton: false,
          heightAuto: false
        })
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
        heightAuto: false
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
      <Header title={'Memory Game'}/>
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <HeadGames/>
            <div>
              <label> Last word found: {lastWordFound} </label>
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
            <p>Attempts: {turns}</p>
            <button onClick={shuffleCards}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};