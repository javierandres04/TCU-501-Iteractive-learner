import { useEffect } from 'react';
import Swal from 'sweetalert2';


const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playable, setGameWin }) => {
  const playSound = (soundName) => {
    let sound = new Audio(`./sounds/${soundName}.m4a`);
    sound.play();
  }
  
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
      setGameWin(true);
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        text: `...the word was: ${selectedWord}`,
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      }).then(()=>{
        setGameWin(false);
      })
      playSound(selectedWord);
      play = false;
    } else if (status === 'lose') {
      Swal.fire({
        title: 'Unfortunately you lost. 😕',
        text: `...the word was: ${selectedWord}`,
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
      playSound(selectedWord);
      play = false;
    }

    setPlayable(play);
  },[correctLetters,wrongLetters,selectedWord,setPlayable]);

}

export default Popup