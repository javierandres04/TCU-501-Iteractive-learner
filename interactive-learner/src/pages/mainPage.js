import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Dropdowns } from '../components/Dropdowns/Dropdowns';
import { GamesGrid } from '../components/GamesGrid/GamesGrid';

import './mainPage.css';
import '../App.css';

export const MainPage = () => {

  return (
    <div id="mainContainer">
      <Header />
      <div id="bodyContainer">
        <div id="mainBox" >
          <Dropdowns />
          <GamesGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};