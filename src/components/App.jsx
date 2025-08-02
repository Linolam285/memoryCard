import { useState } from 'react'

//styles
import '../styles/App.css';

//components
import Header from "./Header.jsx";
import Game from "./Game.jsx";

function App() {

  const [count, setCount] = useState(0)

  const [currentStreak,setCurrentStreak] = useState(0);
  const [highestStreak,setHighestStreak] = useState(0);

  const handleScores = (data) => {
    setCurrentStreak(data.currentStreak);
    setHighestStreak(data.highestStreak);
  }
  return (
    <>
      <Header currentStreak = {currentStreak} highestStreak = {highestStreak}/>
      <Game  sendData = {handleScores} />
    </>
  )
}

export default App;
