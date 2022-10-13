import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import Swal from 'sweetalert2';
import '../../App.css';
import './memoryGame.css';
import { useState, useEffect } from 'react';
import { MemoryCard } from '../../components/MemoryCard/MemoryCard';

const cardImgs = [
  { "src": "/images/helmet.png", "Matched": false },
  { "src": "/images/potion.png", "Matched": false },
  { "src": "/images/ring.png", "Matched": false },
  { "src": "/images/scroll.png", "Matched": false },
  { "src": "/images/shield.png", "Matched": false },
  { "src": "/images/sword.png", "Matched": false }
];

export const MemoryGame = () => {

  const location = useLocation()

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);



  const shuffleCards = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
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
        text: 'A new game will begin'
      })
      shuffleCards();
    }
  }, [cards])

  return (
    <div id="mainContainer">
      <Header />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <h1>Memory Game</h1>
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
            <p>Turns: {turns}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};