import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export const ConfettiRain = () => {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width-2}
      height={height-2}
    />
  )
}