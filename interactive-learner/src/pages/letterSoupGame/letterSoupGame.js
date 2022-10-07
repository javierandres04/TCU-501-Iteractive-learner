import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../App.css';

export const LetterSoupGame = () => {
  const location = useLocation();

  console.log(location.state);

  return (
    <div id="mainContainer">
      <h1>Letter Soup Game</h1>
    </div>
  );
};