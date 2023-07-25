import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import GameCharacter from "../components/GameCharacter";
import { useParams, Link } from 'react-router-dom';


const SecondPage = () => {
  const { id } = useParams();
  const correctPhrase = "The elf moved towards the bushes, and out popped a giant skeleton weaing a mario red shell looking thingy!"
  const [inputValue, setInputValue] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [showTryAgain, setShowTryAgain] = useState(false)
  const [showGoToSecondPage, setShowGoToSecondPage] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
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
    navigate(`/typingtrials3/${id}`)
  }

  return (
    <div>
      <h1>Type the following phrase within 30 seconds:</h1>
      <p>{correctPhrase}</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleCheckPhrase}>Submit</button>

      {showPopup && (
        <div>
          {inputValue === correctPhrase ? (
            <>
              <p>Great job!</p>
              {showGoToSecondPage && (
                <button onClick={() => handleGoToSecondPage(id)}>Fight!</button>
              )}
            </>
          ) : (
            <>
              {showTryAgain && (
                <button onClick={handleReset}>Try again!</button>
              )}
            </>
          )}
        </div>
      )}

      {timeLeft > 0 && !showPopup && <p>Time left: {timeLeft} seconds</p>}
      <div className="pull_up">
      <GameCharacter/>
      </div>
    </div>
  );
};

export default SecondPage
