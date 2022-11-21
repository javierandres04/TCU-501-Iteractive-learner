import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { LettersTable } from '../../components/LetterSoupComponents/LettersTable';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Themes } from '../../data/themes';
import '../../App.css';
import './letterSoupGame.css';

import { useSelector } from 'react-redux';

const tamTable = 9;

const selectWords = (words) => {
  let options = [];
  let selectedWords = [];
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  options = options.slice(0, 6);

  for (let i = 0; i < 6; i++) {
    selectedWords[i] = words[options[i]];
  }
  return selectedWords;
}

const fillTable = (table) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let t = [];
  for (let i = 0; i < tamTable; i++) {
    let temp = [];
    for (let j = 0; j < tamTable; j++) {
      temp.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    t.push(temp);
  }
  return t;
}

export const LetterSoupGame = () => {
  const selectedTheme = `${useSelector((state) => state.theme.selectedTheme.Grade)} 
  - ${useSelector((state) => state.theme.selectedTheme.Unit)} 
  - ${useSelector((state) => state.theme.selectedTheme.Theme)}`;

  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words));
  const [table, setTable] = useState(fillTable(selectedWords));

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <Header />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <h1>Letter Soup Game</h1>
            <h5 id='selectedTheme'>
              <div>{selectedTheme}</div>
            </h5>
            <LettersTable tamTable={tamTable} table={table} />
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};