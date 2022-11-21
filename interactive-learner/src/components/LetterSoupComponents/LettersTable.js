import React from 'react';
import './LettersTable.css'
import { useEffect } from 'react';

export const LettersTable = ({ table, tamTable }) => {

    useEffect(() => {
        let auto = "";
        for (let i = 0; i < tamTable; i++) {
            auto += "auto "
        }
        document.getElementById('grid-container').style.gridTemplateColumns = auto;
    });

    return (
        <div id='soupContainer'>
            <div id="grid-container">
                {
                    table.map((row, index) => {
                        return (
                            <div key={index}>
                                {row.map((letter, index) => {
                                    return (
                                        <div key={index} className="grid-item">{letter}</div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
};