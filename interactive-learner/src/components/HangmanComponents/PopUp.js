import React, { useEffect } from 'react';
import { checkWin } from '../../helpers/helpers';
import Swal from 'sweetalert2';


const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
  let playable = true;

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    Swal.fire({
      title: 'Congratulations! You won! 😃',
      text: `...the word was: ${selectedWord}`,
    })
    playable = false;
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    Swal.fire({
      title: 'Unfortunately you lost. 😕',
      text: `...the word was: ${selectedWord}`,
    })
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

}

export default Popup