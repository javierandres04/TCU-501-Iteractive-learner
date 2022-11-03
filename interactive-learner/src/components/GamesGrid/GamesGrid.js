import React from 'react';
import './GamesGrid.css'
import { Games } from '../../data/games'
import { useNavigate } from 'react-router-dom';

export const GamesGrid = ({ grade, unit, theme }) => {
  const navigate = useNavigate();

  const handleSelectedGame = (element) => {
    element = element.split(' ').join('');
    if (grade && unit && theme) {
      if (grade !== 'Grade' && unit !== 'Unit' && theme !== 'Theme') {
        navigate('/' + element);
      }
    }
  }

  return (
    <div id='games-grid'>
      {Games.map((element) => (
        <div onClick={() => handleSelectedGame(element)} key={element} id='games-container'>
          <label id='game-name'> {element} </label>
        </div>
      ))}
    </div>
  );
};