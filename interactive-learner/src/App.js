import './App.css';
import { MainPage } from './pages/mainPage/mainPage';
import { MemoryGame } from './pages/memoryGame/memoryGame';
import { HangmanGame } from './pages/hangmanGame/hangmanGame';
import { LetterSoupGame } from './pages/letterSoupGame/letterSoupGame';
import { PressTheFigureGame } from './pages/pressTheFigureGame/pressTheFigureGame';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router >
        <Routes>
            <Route path='/' element={<MainPage></MainPage>} />
            <Route path='MemoryGame' element={<MemoryGame></MemoryGame>} />
            <Route path='HangmanGame' element={<HangmanGame></HangmanGame>} />
            <Route path='LetterSoupGame' element={<LetterSoupGame></LetterSoupGame>} />
            <Route path='PressTheFigure' element={<PressTheFigureGame></PressTheFigureGame>} />
        </Routes>
      </Router>
    </>

  );
}


export default App;
