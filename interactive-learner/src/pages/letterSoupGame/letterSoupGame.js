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

const tamTable = 12;
const cantWords = 6;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

const selectWords = (words, cantWords) => {
  let options = [];
  let selectedWords = [];
  for (let i = 0; i < words.length; i++) {
    options[i] = i;
  }
  options.sort(() => Math.random() - 0.5);
  if(cantWords > words.length){
    cantWords = words.length;
  }
  options = options.slice(0, cantWords);

  for (let i = 0; i < cantWords; i++) {
    selectedWords[i] = words[options[i]];
  }
  return selectedWords;
}

const fillTable = (table) => {
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


    /*
    metodo para acomodar las palabras dentro del tablero
    */
const putWordsInTable = (table, selectedWords) => {
  const tam = table.length;
  const cantWords = selectedWords.length;

  for(let i=0;i<cantWords;i++){
    let word = selectedWords[i].word;
    let startPos = console.log(Math.floor(Math.random() * tam));
    let direction = (( console.log( Math.floor(Math.random()*2) ) ) === 0 ? false : true );
    let inverse = ((console.log( Math.floor(Math.random()*2) )) === 0 ? false : true );
  }
  return table
}


export const LetterSoupGame = () => {
  const selectedTheme = `${useSelector((state) => state.theme.selectedTheme.Grade)} 
  - ${useSelector((state) => state.theme.selectedTheme.Unit)} 
  - ${useSelector((state) => state.theme.selectedTheme.Theme)}`;

  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words, cantWords));
  const [table, setTable] = useState( putWordsInTable( fillTable(selectedWords), selectedWords) );


  useEffect(() => {
    document.addEventListener('click', printLetter);
  });
  
  const printLetter = (event) => {
    let text = event.target.textContent;
    if (text.length === 1 && text.match(/[a-z]/)) {
        console.log(text);
    }
  }

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