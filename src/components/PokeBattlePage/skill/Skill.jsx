import { useContext, useEffect, useState } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css'

import dodgeIcon from '../../../assets/images/dodgeIcon.svg'
import attackIcon from '../../../assets/images/attackIcon.svg'
import rangedAttackIcon from '../../../assets/images/rangedAttackIcon.svg'
import defendIcon from '../../../assets/images/defendIcon.svg'

function Skill(props) {

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn] = useContext(ApiContextBattle)

  function skillSelected(){
    setCurrentAction(props.nameAction)
  }
  

  if (props.nameAction == "attack") {
    return (
      <div>
        <button onClick={skillSelected} className='skill' disabled={props.disabled}>
          <img src={attackIcon} alt="" />
        </button>
      </div>
    )
  }

  if (props.nameAction == "rangedAttack") {
    return (
      <div>
        <button onClick={skillSelected} className='skill' disabled={props.disabled}>
          <img src={rangedAttackIcon} alt="" />
        </button>
      </div>
    )
  }

  if (props.nameAction == "defend") {
    return (
      <div>
        <button onClick={skillSelected} className='skill' disabled={props.disabled}>
          <img src={defendIcon} alt="" />
        </button>
      </div>
    )
  }

  if (props.nameAction == "dodge") {
    return (
      <div>
        <button onClick={skillSelected} className='skill' disabled={props.disabled}>
          <img src={dodgeIcon} alt="" />
        </button>
      </div>
    )
  }

  return (
    <></>
  )
}

export default Skill