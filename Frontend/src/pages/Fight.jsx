import React from 'react'
import image from "../images/Bam.jpg"
import GameCharacter from "../components/GameCharacter";
import enemy from "../images/enemies/skeleton-Idle_0.png"
import '../CSS/Enemy.css'

const Fight = () => {
  return (
    <div>
      <div className="fight_scene">
    <div className="player">
    <GameCharacter></GameCharacter>
    </div>
        
        <img src={enemy} alt="enemy" className="enemy" />
      </div>
  </div>
  )
}

export default Fight

