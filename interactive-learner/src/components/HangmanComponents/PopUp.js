import { useEffect } from 'react';
import Swal from 'sweetalert2';


const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playable }) => {
  useEffect(() => {
    let play = true;
    let status = 'win'
    
    // Check for win
    selectedWord.split('').forEach(letter => {
      if (!correctLetters.includes(letter)) {
        status = '';
      }
    });
  
    // Check for lose
    if (wrongLetters.length === 11) status = 'lose';
  
    if (status === 'win') {
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        text: `...the word was: ${selectedWord}`,
      })
      play = false;
    } else if (status === 'lose') {
      Swal.fire({
        title: 'Unfortunately you lost. 😕',
        text: `...the word was: ${selectedWord}`,
      })
      play = false;
    }

    setPlayable(play);
  },[correctLetters,wrongLetters,selectedWord,setPlayable]);

}

export default Popup