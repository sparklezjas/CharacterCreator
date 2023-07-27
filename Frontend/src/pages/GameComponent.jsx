import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import GameCharacter from "../components/GameCharacter"
import { useParams, Link } from 'react-router-dom';
import '../CSS/FightPages.css'
import fightForest from '../images/fightForest.jpg'
import bush from '../images/bush.png'
import submit from '../images/buttons/submit.png'
import retry from '../images/buttons/retry.png'


const GameComponent = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [showTryAgain, setShowTryAgain] = useState(false)
  const [showGoToSecondPage, setShowGoToSecondPage] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  
  const correctPhrase = `The courageous champion was walking through a dark forest and suddenly heard a rustle in the bushes.`
  
  const navigate = useNavigate()

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleLose()
    }
  }, [timeLeft])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  };

  const handleCheckPhrase = () => {
    if (inputValue === correctPhrase) {
      handleWin()
    } else {
      handleLose()
    }
  }

  const handleLose = () => {
    setShowPopup(true)
    setShowTryAgain(true)
  };

  const handleWin = () => {
    setShowPopup(true)
    setShowGoToSecondPage(true)
  }

  const handleReset = () => {
    setShowPopup(false)
    setShowTryAgain(false)
    setShowGoToSecondPage(false)
    setInputValue("")
    setTimeLeft(30)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCheckPhrase()
    }
  }

  const handleGoToSecondPage = (id) => {
    navigate(`/typingtrials2/${id}`)
  }


  // ------------------------------------------DISABLE TEXT SELECTION
  const disableTextSelection = () => {
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    disableTextSelection()
    return () => {}}, [])
  // ------------------------------------------DISABLE TEXT SELECTION

  return (
    <div>
      <div>
        <img className='bush' src={bush} alt="bush"/>
        <img className='fightBkgd' src={fightForest} alt="forest background" />
      </div>
      <div className="pull_up characterPosition">
        <GameCharacter/>
      </div>
      <div className="fightInfo">
      <div className="bottomDetails">
        <h2 className="instructions instNoEnemy">Type the following phrase:</h2>
        <p className="typePhrase">{correctPhrase}</p>
        <input
          className="inputGameText"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        /> <br />
        <button
        className="submitButton"
        style={{backgroundImage:`url(${submit})`}}
        onClick={handleCheckPhrase} 
        type="submit"></button>
      </div>
      </div>
      {showPopup && (
        <div>
          {inputValue === correctPhrase ? (
            <>
              <p className="gameMessages greatJob">WELL DONE!</p>
              {showGoToSecondPage && (
                <button
                className="continueButton"
                onClick={() => handleGoToSecondPage(id)}>Inspect the bushes...</button>
              )}
            </>
          ) : (
            <>
              <p className="gameMessages greatJob">Try again!</p>
              {showTryAgain && (
                <button
                className="retryButton"
                style={{backgroundImage:`url(${retry})`}}
                onClick={handleReset}
                type="button"></button>
              )}
            </>
          )}
        </div>
      )}
      <div className="timer">
      {timeLeft > 0 && !showPopup && 
      <p className="gameMessages">Time left...
      <br />
      <span className="seconds">{timeLeft} Sec</span></p>}
    </div>
    </div>
  );
};

export default GameComponent;
