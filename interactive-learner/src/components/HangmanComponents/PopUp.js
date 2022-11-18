import { useEffect } from 'react';
import Swal from 'sweetalert2';


const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable }) => {
  let playable = true;
  let status = 'win'

  // Check for win
  selectedWord.split('').forEach(letter => {
    if (!correctLetters.includes(letter)) {
      status = '';
    }
  });

  // Check for lose
  if (wrongLetters.length === 10) status = 'lose';

  if (status === 'win') {
    Swal.fire({
      title: 'Congratulations! You won! 😃',
      text: `...the word was: ${selectedWord}`,
    })
    playable = false;
  } else if (status === 'lose') {
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