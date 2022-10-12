import './MemoryCard.css'

export const MemoryCard = ({ card, handleChoise, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
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