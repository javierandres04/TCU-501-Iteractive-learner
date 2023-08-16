import React from 'react';
import './GamesGrid.css';
import { Games } from '../../data/games';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export const GamesGrid = ({ grade, unit, theme }) => {
  const navigate = useNavigate();

  const handleSelectedGame = (element) => {
    element = element.split(' ').join('');
    if (grade && unit && theme) {
      if (grade !== 'Grade' && unit !== 'Unit' && theme !== 'Theme') {
        navigate('/' + element);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: `Please, select a theme for the game.`,
          timer: 5000,
          showConfirmButton: false,
          heightAuto: false,
        })
      }
    } 
  }

  return (
    <div id='games-grid'>
      {Games.map((element) => (
        <div onClick={() => handleSelectedGame(element)} key={element} id='games-container'>
          <label id='game-name'> {element} </label>
          {console.log(element)}
          <img id='game-logo' src={`./images/${element.replace(' ', '_')}_Logo.png`} alt="error"></img>
        </div>
      ))}
    </div>
  );
};