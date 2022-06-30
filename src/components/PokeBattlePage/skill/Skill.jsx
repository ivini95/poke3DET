import { useContext, useEffect, useState } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css'

function Skill(props) {

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn] = useContext(ApiContextBattle)

  const [buttonState, setButtonState] = useState(true)

  function skillSelected(){
    setCurrentAction(props.nameAction)
  }

  return (
    <div>
      <button onClick={skillSelected} className='skill' disabled={props.disabled}> {props.nameAction}</button>
    </div>
  )
}

export default Skill