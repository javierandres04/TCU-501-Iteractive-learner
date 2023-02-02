import Swal from 'sweetalert2';
import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import { MemoryCard } from '../../components/MemoryCard/MemoryCard';
import { Themes } from '../../data/themes';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';
import { ConfettiRain } from '../../components/ConfettiRain/ConfettiRain';
import './dragAndDrop.css';
import '../../App.css';

import { DragDropContainer, DropTarget } from "react-drag-drop-container";

// TODO: instructions
const spanishInstructions = [
  ''
]
const englishInstructions = [
  ''
]

const gato = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg"
const perro = "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg"
const pinguino = "https://raulperez.tieneblog.net/wp-content/uploads/2015/09/tux.jpg"
const names = ["Angry", "Ant", "Baker", "Bear","Camera", "Campfire"]
const random_positions = [1,4,5,0,2,3]
const route = "../../../images/"
const format = ".png"
const default_img = "https://toppng.com/uploads/preview/square-115527604300vrdl6wlrv.png"
var drop = [default_img,default_img,default_img,default_img,default_img,default_img]

// TODO: adjust the number of words selected by this function
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


export const DragAndDrop = () => {
  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [words, setWords] = useState(Themes.find(element => element.name === theme).words);
  const [selectedWords, setSelectedWords] = useState(selectWords(words));
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [transferData, setTransferData] = useState("Cuco");
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);


  const playSound = (soundName) => {
    let sound = new Audio(`./sounds/${soundName}.m4a`);
    sound.play();
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        Swal.fire({
          title: 'Good Work! 😃',
          text: `...this word is: ${choiseOne.word}`,
          timer: 2100,
          showConfirmButton: false,
          heightAuto: false
        })
        playSound(choiseOne.word)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiseOne.src) {
              return { ...card, Matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo])

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }


  const cardIsMatched = (card) => {
    return card.Matched === true;
  }

  const allCardsMatched = () => {
    return cards.every(cardIsMatched);
  }


  useEffect(() => {
    if (allCardsMatched() && turns > 0) {
      setGameWin(true);
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        text: 'You made ' + turns + ' attempts.',
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
    }
  }, [cards])

  const refresh = () => window.location.reload(true);

  const dropped = (e) => {
    setTurns(turns+1);
    e.containerElem.style.visibility = 'hidden';
    drop[0] = route+e.dragData+format;
  }

  const dropped2 = (e) => {
    setTurns(turns+1);
    e.containerElem.style.visibility = 'hidden';
    drop[1] = route+e.dragData+format;
  }

  const dropped3 = (e) => {
    setTurns(turns+1);
    e.containerElem.style.visibility = 'hidden';
    drop[2] = route+e.dragData+format;
  }

  const wrongChoice = (e) => {
    setTurns(turns-1);
    e.containerElem.style.visibility = 'visible';
    
  }

  return (
    <motion.div
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <HelpModal
        isHelpModalOpen={isHelpModalOpen}
        setIsHelpModalOpen={setIsHelpModalOpen}
        englishInstructions={englishInstructions}
        spanishInstructions={spanishInstructions}
      />
      {gameWin && <ConfettiRain />}
      <Header title={'Drag and Drop'} />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='memoryGameContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
            <div id = "images__row">
              <DragDropContainer targetKey={names[0]} dragData={names[0]}>
                <img src={route+names[0]+format} alt="error" width="150px"></img>
              </DragDropContainer>
              <DragDropContainer targetKey={names[1]} dragData={names[1]}>
                <img src={route+names[1]+format} alt="error" width="150px"></img>
              </DragDropContainer>
              <DragDropContainer targetKey={names[2]} dragData={names[2]}>
                <img src={route+names[2]+format} alt="error" width="150px"></img>
              </DragDropContainer>
            </div>
            <div id = "images__row">
              <DropTarget targetKey={names[0]} onHit={dropped}>
                {/*<img src={gato} width="150px"></img>*/}
                <img src={drop[0]} alt = "error" width="150px"></img>
              </DropTarget>
              <DropTarget targetKey={names[1]} onHit={dropped2}>
                {/*<img src={gato} width="150px"></img>*/}
                <img src={drop[1]} alt = "error" width="150px"></img>
              </DropTarget>
              <DropTarget targetKey={names[2]} onHit={dropped3}>
                {/*<img src={gato} width="150px"></img>*/}
                <img src={drop[2]} alt = "error" width="150px"></img>
              </DropTarget>
            </div>
            <div id='stats'>
              <div id='attempts'>Attempts: {turns}</div>
            </div>
            <button onClick={refresh}>New Game</button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};