import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes/AnimatedRoutes';

function App() {
  return (
    <>
      <Router >
        <AnimatedRoutes/>
      </Router>
    </>

  );
}


export default App;
