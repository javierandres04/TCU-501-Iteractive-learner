import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';

import '../../App.css';
import './hangmanGame.css';


export const HangmanGame = () => {
  const location = useLocation();

  console.log(location.state);

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: {duration: 0.2} }}
    >
      <Header />
      <h1>Hangman Game</h1>
      <Footer />
    </motion.div>
  );
};