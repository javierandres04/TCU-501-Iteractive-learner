import React from 'react';
import './DragImages.css';
import { DragDropContainer } from "react-drag-drop-container";

const route = "../../.."

export const DragImages = ({ words, playSelectSound, addAttemp, addMatch }) => {
  let wordList = [];
  words.forEach((word, index)=>{
    wordList.push( 
      <DragDropContainer targetKey={word.word} dragData={[word.word,index]} onDragStart={playSelectSound} onDragEnd={addAttemp} onDrop={addMatch}>
        <img id = "card" src={route+word.imageSrc} alt={word.word}></img>
      </DragDropContainer> 
    )
  })
    return (
      <ul>
        <div id = "cards-container">
          <div id = "cards-grid-drag-images">
            {wordList}
          </div>
        </div>
      </ul>
    );  
};
