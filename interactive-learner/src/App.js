import './App.css';
import { MainPage } from './pages/mainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path='/' element={<MainPage></MainPage>} />
        </Routes>
      </Router>
    </>

  );
}



export default App;
