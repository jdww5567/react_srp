import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [counter, setCounter] = useState(parseInt(localStorage.getItem('savedCounter')));

  if (counter != counter) {
    setCounter(0);
  }

  useEffect(() => {
    localStorage.setItem('savedCounter', counter);
  }, [counter]);

  return (
    <div>
      <h1>Counter App</h1>
      <div className='centeredContainer'>
        <button className='buttonItems' onClick={() => setCounter(counter - 1)}>-</button>
        <h2 className='buttonItems'>{counter}</h2>
        <button className='buttonItems' onClick={() => setCounter(counter + 1)}>+</button>
      </div>
    </div>
  );
}

export default App
