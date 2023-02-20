import React from 'react';
import './DropImages.css';
import { DropTarget } from "react-drag-drop-container";

const route = "../../../images/"
const format = ".png"
const df = "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"

var placeholder = []
var names_order = []

const playSound = (soundName) => {
  let sound = new Audio(`./sounds/${soundName}.m4a`);
  sound.play();
}

/**
 * Receives the information from the image dropped in the position
 * that matched the key.
 * 
 * Looks in the names_order the position where the name is equal and
 * updates the appearence of that box.
 */
const changePlacerholder = (e) => {
  e.containerElem.style.visibility = 'hidden';
  names_order.forEach((word, index)=>{
    if(e.dragData[0] === word.word) {  
      placeholder[index] = route+e.dragData[0].replace(' ', '_')+format;
      playSound(e.dragData[0].replace(' ', '_'))
    }
  })
}

export const DropImages = ({ words, turns }) => {
  let wordList = [];
  names_order = words;
  if (turns === 0){
    placeholder = [df,df,df,df,df,df,df,df];
  }
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
