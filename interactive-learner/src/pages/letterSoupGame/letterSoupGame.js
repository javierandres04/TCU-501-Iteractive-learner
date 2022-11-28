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
  if (cantWords > words.length) {
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
  let available = [];
  for (let i = 0; i < tam; i++) {
    let temp = [];
    for (let j = 0; j < tam; j++) {
      temp.push('*');
    }
    available.push(temp);
  }

  for (let i = 0; i < cantWords; i++) {
    let correct = false;
    let word = selectedWords[i].word.replace(/\s/g, '').toLowerCase();

    while (correct === false) {
      let fil = Math.floor(Math.random() * tam);
      let col = Math.floor(Math.random() * tam);
      let direction = (Math.floor(Math.random() * 8));

      switch (direction) {
        case 0:
          // code block
          if (fil - word.length >= 0) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              fil--;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;

        case 1:
          // code block
          if ((fil - word.length >= 0) && (col + word.length < tam)) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              fil--;
              col++;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;

        case 2:
          // code block
          if (col + word.length < tam) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              col++;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;

        case 3:
          // code block
          if ((fil + word.length < tam) && (col + word.length < tam)) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              fil++;
              col++;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;

        case 4:
          // code block
          if (fil + word.length < tam) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              fil++;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;

        case 5:
          // code block
          if ((fil + word.length < tam) && (col - word.length >= 0)) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              fil++;
              col--;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;

        case 6:
          // code block
          if (col - word.length >= 0) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              col--;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;


        case 7:
          // code block
          if ((fil - word.length >= 0) && (col - word.length >= 0)) {

            let posible = true;
            let positions = [];

            for (let i = 0; i < word.length; i++) {
              if (available[col][fil] === "*") {
                positions.push([col]);
                positions[i].push(fil);

              } else {
                posible = false;
                break;
              }
              fil--;
              col--;
            }

            if (posible) {
              for (let i = 0; i < word.length; i++) {
                table[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
                available[positions[i][0]][positions[i][1]] = word.substring(i, i + 1);
              }
              correct = true;
            }
          }
          break;
      }
    }
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
  const [table, setTable] = useState(putWordsInTable(fillTable(selectedWords), selectedWords));
  const [initialLetter, setInitialLetter] = useState();
  const [finalLetter, setFinalLetter] = useState();

  useEffect(() => {
    document.addEventListener('mousedown', detectWord);
    document.addEventListener('mouseup', detectWord);
  },[]);

  useEffect(() => {
    if( finalLetter !== undefined ){
      findWord(); 
    }
  },[finalLetter]);

  const detectWord = (event) => {
    let text = event.target.textContent;
    if (text.length === 1 && text.match(/[a-z]/)) {
      if(event.type == 'mousedown'){
        console.log('mousedown');
        setInitialLetter({letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col)});
      }else if(event.type == 'mouseup'){
          console.log('initialLetter: ',initialLetter);
          console.log("mouseup");
          setFinalLetter({letter: text, fil: parseInt(event.target.dataset.fil), col: parseInt(event.target.dataset.col)});
      }
    }
  }

  const findWord = () => {

    let filResult = Math.abs(initialLetter.fil - finalLetter.fil);
    let ColResult = Math.abs(initialLetter.col - finalLetter.col);
    let wordLenght = (filResult>=ColResult ? filResult : ColResult);

    let buildedWord = '';
    let currentFil = initialLetter.fil;
    let currentCol = initialLetter.col;

    initialLetter.col--;
    for(let i=0;i<=wordLenght;i++){
      buildedWord += table[currentFil][currentCol];
      console.log(currentFil,currentCol)
      if(currentFil > finalLetter.fil){
        currentFil--;
      }else if(currentFil < finalLetter.fil){
        currentFil++;
      }
      if(currentCol > finalLetter.col){
        currentCol--;
      } else if(currentCol < finalLetter.col){
        currentCol++;
      }
    }

    console.log(buildedWord);

    selectedWords.forEach(element => {
      if(buildedWord == element.word.toLowerCase()){
        console.log("palabra encontrada");
      }
    });

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
            <LettersTable tamTable={tamTable} table={table} />
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};