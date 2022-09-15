import React from 'react';
import './Footer.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoUCR from './ucr.png';
import logoTCU from './TCU.png';

export const Footer = () => {
    return (
        <>
            <Navbar id='footer' bg="clear" variant="clear">
                <Container id="footerContainer">
                    <img className='logos' src={logoUCR} alt="logo" />
                    <img className='logos' src={logoTCU} alt="logo" />
                    <Navbar.Brand  href="#home">© Sebastián Alfaro, Javier Molina </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};