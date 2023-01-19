import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {IoMdHelp} from 'react-icons/io';


export const HeadGames = ({ setIsHelpModalOpen }) => {
  const selectedTheme = `${useSelector((state) => state.theme.selectedTheme.Grade)}
  - ${useSelector((state) => state.theme.selectedTheme.Unit)}
  - ${useSelector((state) => state.theme.selectedTheme.Theme)}`;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  }

  const handleHelpClick = () => {
    setIsHelpModalOpen(true);
  }

  return (
    <div id='gameHeader'>
      <button onClick={handleBackClick} id='game-button'> {<BiArrowBack />} </button>
      <h4 id='selectedTheme'>
        <div>{selectedTheme}</div>
      </h4>
      <button onClick={handleHelpClick} id='game-button'> {<IoMdHelp/>} </button>
    </div>

  )
}
