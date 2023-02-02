import React from 'react';
import './DragImages.css';
import { DragDropContainer } from "react-drag-drop-container";

const route = "../../../images/"
const format = ".png"

export const DragImages = ({ words, addAttemp }) => {
  let wordList = [];
  words.forEach((word)=>{
    wordList.push( 
      <DragDropContainer targetKey={word} dragData={word} onDragEnd={addAttemp}>
        <img src={route+word+format} alt="error" width="150px"></img>
      </DragDropContainer> 
    )
  })
    return (
      <ul>
        <div id = "cards-grid">
          {wordList}
        </div>
      </ul>
    );  
};