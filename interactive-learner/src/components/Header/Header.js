import React from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <img src="aaa"></img>
                    <Navbar.Brand href="#home">Interactive English Learner</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};
