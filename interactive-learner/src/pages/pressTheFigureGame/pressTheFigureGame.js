import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../App.css';

export const PressTheFigureGame = () => {
  const location = useLocation();

  console.log(location.state);

  return (
    <div id="mainContainer">
      <h1>Press The Figure Game</h1>
    </div>
  );
};