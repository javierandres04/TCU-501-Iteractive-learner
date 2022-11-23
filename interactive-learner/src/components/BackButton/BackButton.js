import React from 'react';
import {BiArrowBack} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


export const BackButton = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  }
  
  return (
    <button onClick={handleBackClick} id='game-button'> {<BiArrowBack/>} </button>
  )
}
