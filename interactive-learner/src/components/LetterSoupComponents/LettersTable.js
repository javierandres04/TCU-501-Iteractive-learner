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
          table.map((row, i) => {
            return (
              <div key={i}>
                {row.map((letter, j) => {
                  return (
                    <div key={j} id={`${i}-${j}`} className="grid-item" data-fil={i} data-col={j}>{letter.content}</div>
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