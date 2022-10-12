import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Dropdowns } from '../../components/Dropdowns/Dropdowns';
import { GamesGrid } from '../../components/GamesGrid/GamesGrid';
import { useState } from 'react';

import '../../App.css';

export const MainPage = () => {
  const [grade, setGrade] = useState('Grade');
  const [unit, setUnit] = useState('Unit');
  const [theme, setTheme] = useState('Theme');


  return (
    <div id="mainContainer">
      <Header />
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
    </div>
  );
};