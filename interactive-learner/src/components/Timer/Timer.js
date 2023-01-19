import { useEffect } from 'react'

export const Timer = ({ stopTimer, seconds, setSeconds, minutes, setMinutes}) => {
  useEffect(() => {
      if(stopTimer === false) {
        setTimeout(() => {
          if(seconds === 60) {
            setMinutes(minutes + 1);
            setSeconds(0);
          } else {
            setSeconds(seconds + 1);
          }
        }, 1000)
      }
  }, [seconds, minutes])
  


  return (
    <p> {minutes < 10 ? 0:''}{minutes} : {seconds < 10 ? 0:''}{seconds}</p>
  )
}
