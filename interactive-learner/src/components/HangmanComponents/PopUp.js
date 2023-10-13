import { useEffect } from 'react';
import Swal from 'sweetalert2';

/** Using sound effect "Success Fanfare Trumpets" from freesound.org
   * https://freesound.org/people/FunWithSound/sounds/456966/
   * created by user: FunWithSound
  */
const playVictorySound = () => {
  let sound = new Audio(`./sounds/SoundEffects/Success-Fanfare-Trumpets.mp3`);
  sound.play();
}

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playable, setGameWin , minutes, seconds}) => {
  const playSound = (soundName) => {
    let sound = new Audio(`./sounds/${soundName}.mp3`);
    sound.play();
  }
  
  useEffect(() => {
    let play = true;
    let status = 'win'
    
    // Check for win
    selectedWord.toLowerCase().split('').forEach(letter => {
      if (!correctLetters.includes(letter)) {
        status = '';
      }
    });
  
    // Check for lose
    if (wrongLetters.length === 11) status = 'lose';
  
    if (status === 'win') {
      setGameWin(true);
      playVictorySound()
      Swal.fire({
        title: 'Congratulations! You won! 😃',
        text: `You found the word ''${selectedWord}'' in ${minutes} minutes and ${seconds} ...seconds.`,
        heightAuto: false,
        confirmButtonColor: '#44a49c'
      })
      playSound(selectedWord);
      play = false;
    } else if (status === 'lose') {
      Swal.fire({
        title: 'Unfortunately you lost. 😕',
        text: `he word was ''${selectedWord}.''`,
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