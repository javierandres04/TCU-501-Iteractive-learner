import React from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../logo/logo_transparent.png';
import { useNavigate } from 'react-router-dom';


export const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <>
      <Navbar id='header'>
        <Container id='headerContainer'>
          <img id='logoApp' onClick={handleLogoClick} src={logo} alt="logo" />
          <Navbar.Brand id='title'>{title}</Navbar.Brand>
        </Container>

      </Navbar>
    </>
  );
};
