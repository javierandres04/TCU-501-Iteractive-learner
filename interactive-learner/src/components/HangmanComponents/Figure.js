import React from 'react'

const Figure = ({ wrongLetters }) => {
  const errors = wrongLetters.length

  return (
    <svg height="250" width="200" className="figure-container">

      <line className='clearLine' x1="20" y1="230" x2="100" y2="230" />
      <line className='clearLine' x1="60" y1="20" x2="60" y2="230" />
      <line className='clearLine' x1="60" y1="20" x2="140" y2="20" />
      <line className='clearLine' x1="140" y1="20" x2="140" y2="50" />
      <circle className='clearLine' cx="140" cy="70" r="20" />
      <line className='clearLine' x1="140" y1="90" x2="140" y2="150" />
      <line className='clearLine' x1="140" y1="120" x2="120" y2="100" />
      <line className='clearLine' x1="140" y1="120" x2="160" y2="100" />
      <line className='clearLine' x1="140" y1="150" x2="120" y2="180" />
      <line className='clearLine' x1="140" y1="150" x2="160" y2="180" />

      {/* <!-- Rod --> */}
      {errors > 0 &&
        <line x1="20" y1="230" x2="100" y2="230" />
      }
      {/* <!-- Rod --> */}
      {errors > 1 &&

        <line x1="60" y1="20" x2="60" y2="230" />
      }
      {/* <!-- Rod --> */}
      {errors > 2 &&
        <line x1="60" y1="20" x2="140" y2="20" />
      }
      {/* <!-- Rod --> */}
      {errors > 3 &&
        <line x1="140" y1="20" x2="140" y2="50" />

      }

      {/* <!-- Head --> */}
      {errors > 5 &&
        <circle cx="140" cy="70" r="20" />
      }
      {/* <!-- Body --> */}
      {errors > 6 &&
        <line x1="140" y1="90" x2="140" y2="150" />
      }
      {/* <!-- Arms --> */}
      {errors > 7 &&
        <line x1="140" y1="120" x2="120" y2="100" />
      }
      {errors > 8 &&
        <line x1="140" y1="120" x2="160" y2="100" />
      }
      {/* <!-- Legs --> */}
      {errors > 9 &&
        <line x1="140" y1="150" x2="120" y2="180" />
      }
      {errors > 10 &&
        <line x1="140" y1="150" x2="160" y2="180" />
      }
    </svg>
  )
}

export default Figure