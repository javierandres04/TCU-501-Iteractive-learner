import React from 'react';
import './Footer.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Footer = () => {
    return (
        <>
            <Navbar id='footer' bg="clear" variant="clear">
                <Container id="copyright">
                    <Navbar.Brand  href="#home">© Sebastian Alfaro, Javier Molina </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};