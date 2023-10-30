import React from 'react';
import './Footer.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoUCR from './ucr.png';
import logoTCU from './TCU.png';
import { CreditsModal } from '../CreditsModal/CreditsModal';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Footer = () => {
    const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
    const location = useLocation();

    const handleCreditsClick = () => {
        setIsCreditsModalOpen(true);
    }
    

    return (
        <>
            <Navbar id='footer' bg="clear" variant="clear">
                <Container id="footerContainer">
                    {location.pathname === '/' ?
                        <button onClick={handleCreditsClick}> {"About"} </button>
                        :
                        <></>
                    }
                    <div id="footerLogosContainer">
                        <img className='logos' src={'./images/logoTCU501.png'} alt="logo" />
                        <img className='logos' src={logoUCR} alt="logo" />
                        <img className='logos' src={logoTCU} alt="logo" />
                    </div>
                    <CreditsModal
                        isCreditsModalOpen={isCreditsModalOpen}
                        setIsCreditsModalOpen={setIsCreditsModalOpen}
                    />
                </Container>
            </Navbar>
        </>
    );
};