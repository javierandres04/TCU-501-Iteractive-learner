import React from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../logo/logo_transparent.png';

export const Header = () => {
    return (
        <>
            <Navbar id='header'>
                <Container id='myContainer'>
                    <img id='logoApp' src={logo} alt="logo" />
                    <Navbar.Brand id='title' href="/">Interactive English Learner</Navbar.Brand>
                </Container>

            </Navbar>
        </>
    );
};
