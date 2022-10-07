import './App.css';
import { MainPage } from './pages/mainPage/mainPage';
import { MemoryGame } from './pages/memoryGame/memoryGame';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<MainPage></MainPage>} />
          <Route path='MemoryGame' element={<MemoryGame></MemoryGame>} />

        </Routes>
      </Router>
    </>

  );
}



export default App;
