import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../App.css';

export const HangmanGame = () => {
  const location = useLocation();

  console.log(location.state);

  return (
    <div id="mainContainer">
      <h1>Hangman Game</h1>
    </div>
  );
};