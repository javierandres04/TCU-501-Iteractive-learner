import React from 'react';
import {Header} from '../components/Header/Header';
import {Footer} from '../components/Footer/Footer';
import './mainPage.css';
import '../App.css';

export const MainPage = () => {

    return (
        <div id="mainContainer">
            <Header></Header>
            <div id="bodyContainer">
                <div id="mainBox" >

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};