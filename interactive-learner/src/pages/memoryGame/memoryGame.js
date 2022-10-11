import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import '../../App.css';
import './memoryGame.css';
import {useState} from 'react';

const cardImgs = [
  {"src" : "./helmet.png"},
  {"src" : "./potion.png"},
  {"src" : "./ring.png"},
  {"src" : "./scroll.png"},
  {"src" : ".s/shield.png"},
  {"src" : "./sword.png"}
];

export const MemoryGame = () => {

  const location = useLocation()

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
      .sort( () => Math.random() - 0.5)
      .map( (card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  }

  return (
    <div id="mainContainer">
      <Header />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <h1>Memory Game</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div id='card-grid'>
              {cards.map( card => (
                  <div className='card' key={card.id}>
                    <div >
                      <img className='front' src={card.src} alt="card front"/>
                      <img className='back' src='./cover.png' alt="card back"/>
                    </div>
                  </div>
                ))
              }
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};