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
import './dictionary.css';

const spanishInstructions = [
  ''
]
const englishInstructions = [
  ''
]

const wordSound = (soundName) => {
  let sound = new Audio(`./sounds/`+soundName+`.m4a`);
  sound.play();
}

export const Dictionary = () => {
  const theme = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const words = Themes.find(element => element.name === theme[0]).words;
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  let dictionaryLines = [];
  words.forEach((word) => {
    dictionaryLines.push(
    <tr>
    <td><img id="card" src={"../../.."+word.imageSrc} alt={word.word} width="150px"></img></td>
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
      <Header title={'Dictionary'} />
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
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};