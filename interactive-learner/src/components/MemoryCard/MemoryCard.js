import './MemoryCard.css'

  /** Using sound effect "Card Flip" from freesound.org
   * https://freesound.org/people/f4ngy/sounds/240776/
   * created by user: f4ngy
  */
  const playCardFlipSound = () => {
    let sound = new Audio(`./sounds/SoundEffects/card-flip.wav`);
    sound.play();
  }

export const MemoryCard = ({ card, handleChoise, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
      playCardFlipSound();
      handleChoise(card);
    }
  }

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt="card front" />
        <img className='back' onClick={handleClick} src='./images/cover.png' alt="card back" />
      </div>
    </div>
  )
}