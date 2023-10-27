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

const spanishInstructions = [
  ''
]
const englishInstructions = [
  ''
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
    <td><img id="card_glosary" src={"../../.."+word.imageSrc} alt={word.word} width="150px"></img></td>
    <td>{word.word}</td>
    <td><button onClick={() => wordSound(word.word.replace(' ', '_'))}> {<RiPlayMiniLine />} </button></td>
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
            <table>
              <tr>
                <th>Image</th>
                <th>Word</th>
                <th>Sound</th>
              </tr>
              {dictionaryLines}
            </table>
            <div id="glosaryButtonsContainer">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
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