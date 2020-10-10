import React, {useState, useRef} from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [status, setStatus] = useState(false);
  const [pause, setpause] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [title, setTitle] = useState("Welcome to the Pomodoro timer!")
  const minutes = padTime(Math.floor(timeLeft /60));
  const secondes = padTime(timeLeft - minutes*60);
  const intervalRef = useRef(null);
  const stackRef = useRef(0);
  function startTimer() {
    stackRef.current++;
    intervalRef.current = setInterval(() => setTimeLeft(timeLeft => {
      if(timeLeft >= 1) return timeLeft-1;
      if(stackRef.current%4==0)
      {
        setTimeLeft(15*60);
      }
      else
      {
        setTimeLeft(5*60);
      }
      pauseTimer();
    }), 1000);
    setTitle("You will achieve greatness !");
    setStatus(true);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    setTitle("Don't give up!");
    setStatus(false);
  }

  function resetTimer() {
    setpause(false);
    clearInterval(intervalRef.current);
    setTitle("Are you ready for the next Pomodoro ?!")
    setTimeLeft(25*60);
    setStatus(false);
  }

  function pauseTimer() {
    setpause(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setTimeLeft(timeLeft => {
      if(timeLeft >= 1) return timeLeft-1;
      resetTimer();
    }), 1000);
    setTitle("Time to relax !");
    setStatus(true);
  }

  return (
    <div className="app">
      <h2>{title}</h2>
      <p>Number of cycles : {stackRef.current}</p>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{secondes}</span>
      </div>

      <div className="buttons">
        {!status ? (
        !pause ? (<button onClick={startTimer}>Start</button>): (<button onClick={pauseTimer}>Start</button>)
        ) : (<button onClick={stopTimer}>Stop</button>
          )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
