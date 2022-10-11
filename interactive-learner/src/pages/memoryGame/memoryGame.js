import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import '../../App.css';
import './memoryGame.css';

export const MemoryGame = () => {
  const location = useLocation();

  console.log(location.state);

  return (
    <div id="mainContainer">
      <Header />
      <h1>Memory Game</h1>
      <Footer/>
    </div>
  );
};