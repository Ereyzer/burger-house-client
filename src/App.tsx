import { useState } from 'react';
import './App.css';
import TimerOverlay from './components/timerOverlay/TimerOverlay';

// const openDate = new Date(2025, 11, 1, 8, 0, 0);
const openDate = new Date(2025, 9, 8, 16, 33, 0);
const dateNow = new Date();

function App() {
  const [count, setCount] = useState(0);
  const [isTimer, setIsTimer] = useState(openDate > dateNow);

  return (
    <>
      {isTimer ? (
        <TimerOverlay timeTo={openDate} onClose={() => setIsTimer(false)} dateNow={dateNow} />
      ) : (
        <>
          <div></div>
          <h1 className="montserrat-font montserrat-h1">Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
      )}
    </>
  );
}

export default App;
