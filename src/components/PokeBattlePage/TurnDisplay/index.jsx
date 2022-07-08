import { useEffect } from 'react'
import { useContext } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'

function TurnDisplay(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle] = useContext(ApiContextBattle)

  useEffect(()=>{
    const botDisplay = document.getElementById('botDisplay')
    const playerDisplay = document.getElementById('playerDisplay')
    if (charTurn && charTurn != undefined) {
      if (charTurn[0] == "bot") {
        playerDisplay.style.border = ""
        botDisplay.style.border = "2px solid #9EF01A"
      }else if (charTurn[0] == "player"){
        botDisplay.style.border = ""
        playerDisplay.style.border = "2px solid #9EF01A"
      }
    }
    
  },[charTurn])

  return (
    <div className="turnDisplay">
        <p id='botDisplay'>BOT</p>
        <p id='playerDisplay'>PLAYER</p>
    </div>
  )
}

export default TurnDisplay