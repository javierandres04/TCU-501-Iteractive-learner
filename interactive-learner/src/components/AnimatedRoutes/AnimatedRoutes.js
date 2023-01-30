import React from 'react'
import { MainPage } from '../../pages/mainPage/mainPage';
import { MemoryGame } from '../../pages/memoryGame/memoryGame';
import { HangmanGame } from '../../pages/hangmanGame/hangmanGame';
import { WordSearchGame } from '../../pages/wordSearchGame/wordSearchGame';
import { PressTheFigureGame } from '../../pages/pressTheFigureGame/pressTheFigureGame';
import { DragAndDrop } from '../../pages/dragAndDrop/dragAndDrop';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainPage></MainPage>} />
        <Route path='MemoryGame' element={<MemoryGame></MemoryGame>} />
        <Route path='HangmanGame' element={<HangmanGame></HangmanGame>} />
        <Route path='WordSearchGame' element={<WordSearchGame></WordSearchGame>} />
        <Route path='PressTheFigure' element={<PressTheFigureGame></PressTheFigureGame>} />
        <Route path='DragAndDrop' element={<DragAndDrop></DragAndDrop>} />
      </Routes>
    </AnimatePresence>
  )
}
