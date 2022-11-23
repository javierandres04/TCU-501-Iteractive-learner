import React from 'react';
import {IoMdHelp} from 'react-icons/io';
import './HelpButton.css';


export const HelpButton = () => {
  const handleHelpClick = () => {

  }
  
  return (
    <button onClick={handleHelpClick} id='game-button'> {<IoMdHelp/>} </button>
  )
}