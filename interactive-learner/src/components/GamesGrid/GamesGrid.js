import React from 'react';
import './GamesGrid.css'
import { Games } from '../../data/games'


export const GamesGrid = () => {


  return (
    <div id='games-grid'>
      {Games.map((element) => (
        <div key={element} id='games-container'>
          <label> {element} </label>
        </div>
      ))}
    </div>
  );
};