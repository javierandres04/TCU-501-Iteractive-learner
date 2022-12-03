import React from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../logo/logo_transparent.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdHelp } from 'react-icons/io';


export const Header = ({ title, setIsHelpModalOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  }

  const handleHelpClick = () => {
    setIsHelpModalOpen(true);
  }

  return (
    <>
      <Navbar id='header'>
        <Container id='headerContainer'>
          <img id='logoApp' onClick={handleLogoClick} src={logo} alt="logo" />
          <Navbar.Brand id='title'>{title}</Navbar.Brand>
          {location.pathname === '/' ?
            <button onClick={handleHelpClick} id='game-button' className='MainHelpButton'> {<IoMdHelp />} </button>
            :
            <></>
          }
        </Container>

      </Navbar>
    </>
  );
};
