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
  const selectedTheme = `${useSelector((state) => state.theme.selectedTheme.Grade)} 
  - ${useSelector((state) => state.theme.selectedTheme.Unit)} 
  - ${useSelector((state) => state.theme.selectedTheme.Theme)}`;

  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words));
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  let cardImgs = [
    { "src": "", "Matched": false },
    { "src": "", "Matched": false },
    { "src": "", "Matched": false },
    { "src": "", "Matched": false },
    { "src": "", "Matched": false },
    { "src": "", "Matched": false }
  ];

  const shuffleCards = () => {
    setSelectedWords(selectWords(words));
    if (selectedWords) {
      for (let i = 0; i < cardImgs.length; i++) {
        cardImgs[i].src = selectedWords[i].imageSrc;
      }
      const shuffledCards = [...cardImgs, ...cardImgs]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

      setChoiseOne(null);
      setChoiseTwo(null);
      setCards(shuffledCards);
      setTurns(0);
    }
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
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
        text: 'You made ' + turns + ' attempts.'
      })
    }
  }, [cards])

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: {duration: 0.2} }}
    >
      <Header />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <h1>Memory Game</h1>
            <h5 id='selectedTheme'>
              <div>{selectedTheme}</div>
            </h5>
            <button onClick={shuffleCards}>New Game</button>

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
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};