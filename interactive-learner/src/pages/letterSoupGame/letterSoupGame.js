import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { motion } from 'framer-motion';

import '../../App.css';
import './letterSoupGame.css';

export const LetterSoupGame = () => {

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: {duration: 0.2} }}
    >
      <Header />
      <h1>Letter Soup Game</h1>
      <Footer />
    </motion.div>
  );
};