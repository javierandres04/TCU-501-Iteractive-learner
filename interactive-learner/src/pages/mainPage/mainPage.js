import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Dropdowns } from '../../components/Dropdowns/Dropdowns';
import { GamesGrid } from '../../components/GamesGrid/GamesGrid';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedTheme } from '../../slices/themeSlice';
import '../../App.css';
import { HelpModal } from '../../components/HelpModal/HelpModal';

const spanishInstructions = [
  'Arriba se muestran tres desplegables con los cuales se puede elegir el grado, la unidad y el tema que se quieren usar para jugar.', 
  'Una vez seleccionados, se puede utilizar alguno de los juegos disponibles haciendo click en su imagen correspondiente.',
  'De momento se encuentran disponibles las unidades 1 y 2 de cuarto y quinto año.' 
];
const englishInstructions = [
  'There are three drop-downs with which you can choose the grade, unit and theme that you want to practice.',
  'Once selected, you can play any of the available games by clicking on its corresponding image.',
  'At the moment, units one and two of fourth and fifth grade are available'
];

export const MainPage = () => {
  const [grade, setGrade] = useState(useSelector((state) => state.theme.selectedTheme.Grade));
  const [unit, setUnit] = useState(useSelector((state) => state.theme.selectedTheme.Unit));
  const [theme, setTheme] = useState(useSelector((state) => state.theme.selectedTheme.Theme));
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( updateSelectedTheme ( { Grade: grade, Unit: unit, Theme: theme }))
  }, [grade, unit, theme])
  
  return (
    <motion.div 
      id="mainContainer"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: {duration: 0.2} }}
    >
      <HelpModal
        isHelpModalOpen={isHelpModalOpen}
        setIsHelpModalOpen={setIsHelpModalOpen}
        spanishInstructions={spanishInstructions}
        englishInstructions={englishInstructions}
      />
      
      <Header 
        title={'Select a Theme'}
        setIsHelpModalOpen={setIsHelpModalOpen}
      />
      <div id="bodyContainer">
        <div id="mainBox" >
          <Dropdowns
            grade={grade}
            setGrade={setGrade}
            unit={unit}
            setUnit={setUnit}
            theme={theme}
            setTheme={setTheme}
          />
          <GamesGrid
            grade={grade}
            unit={unit}
            theme={theme}
          />
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};