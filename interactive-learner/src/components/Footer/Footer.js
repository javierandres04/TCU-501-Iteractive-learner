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
                    <div id="footerLogosContainer">
                        <img className='logos' src={'./images/logoTCU501.png'} alt="logo" />
                        <img className='logos' src={logoUCR} alt="logo" />
                        <img className='logos' src={logoTCU} alt="logo" />
                    </div>
                    <Navbar.Brand id='authors' >© Sebastián Alfaro, Javier Molina, Fabián González, Kevin Arguedas </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};