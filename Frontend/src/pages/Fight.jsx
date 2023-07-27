import React from 'react'
import image from "../images/Bam.jpg"
import GameCharacter from "../components/GameCharacter";
import enemy from "../images/enemies/skeleton-Idle_0.png"
import fightBkgd from "../images/fightScreen.jpg"

import '../CSS/Enemy.css'

const Fight = () => {
  return (
    <div>
      <div className="fight_scene">
    <div className="player playerFight">
    <GameCharacter></GameCharacter>
    </div>
        <img src={enemy} alt="enemy" className="enemy enemyFight" />
      </div>
      <img src={fightBkgd} alt="enemy" className="fightScreen" />
  </div>
  )
}

export default Fight

