import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { Themes } from '../../data/themes';
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
    console.log('opens');
    setIsHelpModalOpen(true);
  }

  return (
    <div id='gameHeader'>
      <button onClick={handleBackClick} id='game-button'> {<BiArrowBack />} </button>
      <h5 id='selectedTheme'>
        <div>{selectedTheme}</div>
      </h5>
      <button onClick={handleHelpClick} id='game-button'> {<IoMdHelp/>} </button>
    </div>

  )
}
