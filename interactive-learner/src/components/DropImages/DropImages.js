import React from 'react';
import './DropImages.css';
import { DropTarget } from "react-drag-drop-container";

const route = "../../../images/"
const format = ".png"
const df = "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"

var placeholder = [df,df,df,df,df,df,df,df]

const changePlacerholder = (e) => {
  e.containerElem.style.visibility = 'hidden';
  placeholder[e.dragData[1]] = route+e.dragData[0]+format;
}



export const DropImages = ({ words }) => {
  let wordList = [];
  words.forEach((word, index)=>{
    wordList.push( 
      <DropTarget targetKey={word.word} onHit={changePlacerholder}>
        <div id = "memoryGameContainer">
          <img src={placeholder[index]} alt = "error" width="150px"></img>
          <b>{word.word}</b>
        </div>
      </DropTarget>
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
