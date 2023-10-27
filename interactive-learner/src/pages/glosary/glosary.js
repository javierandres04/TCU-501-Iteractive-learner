import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useState } from 'react';
import { Themes } from '../../data/themes';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HeadGames } from '../../components/HeadGames/HeadGames';
import { HelpModal } from '../../components/HelpModal/HelpModal';
import {RiPlayMiniLine} from 'react-icons/ri';
import './glosary.css';
import { current } from '@reduxjs/toolkit';

const spanishInstructions = [
  'El glosario contiene todo el vocabulario del tema que se selecciono.',
  'Se muestran 4 palabras por página.',
  'Haz click encima del botón de audio para escuchar la pronunciación.',
  'El número de página se muestra debajo de la tabla de contenidos.',
  'Se puede presionar el botón de \'Next\' para ir a la siguiente página.',
  'Se puede presionar el botón de \'Previous\' para ir a la página anterior.',
]

const englishInstructions = [
  'The glossary contains all the vocabulary related to the selected theme.',
  'Each page displays 4 words.',
  'Click on the audio button to listen to the pronunciation.',
  'The page number is shown below the table of contents.',
  'You can press the \'Next\' button to go to the next page.',
  'You can press the \'Previous\' button to go to the previous page.',
]

const wordSound = (soundName) => {
  console.log(`./sounds/`+soundName+`.mp3`);
  let sound = new Audio(`./sounds/`+soundName.replace("_"," ")+`.mp3`);
  sound.play();
}

export const Glosary = () => {
  const theme = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const words = Themes.find(element => element.name === theme[0]).words;
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const paginatedData = words.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  let dictionaryLines = [];
  paginatedData.forEach((word) => {
    dictionaryLines.push(
    <tr>
      <td id ="glosaryImage"><img id="card_glosary" src={"../../.."+word.imageSrc} alt={word.word}></img></td>
      <td id ="glosaryWord">{word.word}</td>
      <td id ="glosaryTable"><button onClick={() => wordSound(word.word.replace(' ', '_'))}> {<RiPlayMiniLine />} </button></td>
    </tr>
    )
    })
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
      <Header title={'Glosary'} />
      <div id="bodyContainer">
        <div id="mainBox" >
          <div id='dictionaryContainer'>
            <HeadGames setIsHelpModalOpen={setIsHelpModalOpen} />
            <table id ="glosaryTable">
              <tr>
                <th>Image</th>
                <th>Word</th>
                <th>Sound</th>
              </tr>
              {dictionaryLines}
            </table>
            <div><b>Page: </b>{currentPage}</div>
            <div id="glosaryButtonsContainer">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {" "}
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= words.length}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};