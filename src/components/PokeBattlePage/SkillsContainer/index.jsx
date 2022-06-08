import { useContext, useEffect, useState } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import Skill from '../skill/Skill'
import './style.css'

function SkillContainer(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn] = useContext(ApiContextBattle)

  const [buttonStateAt, setButtonStateAt] = useState(false)
  const [buttonStateDef, setButtonStateDef] = useState(false)

  
  useEffect(()=>{

    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
    }

    if (charTurn[0] == "player" && charTurn[1] == "defense" ) {
      setButtonStateAt(true)
      setButtonStateDef(false)
    }else if (charTurn[0] == "player" && charTurn[1] == "attack"){
      setButtonStateDef(true)
      setButtonStateAt(false)
    }
  },[charTurn])
  
  return (
    <div className='skillContainer'>
      <Skill nameAction={"attack"} disabled={buttonStateAt}/>
      <Skill nameAction={"rangedAttack"} disabled={buttonStateAt}/>
      <Skill nameAction={"defend"} disabled={buttonStateDef}/>
      <Skill nameAction={"dodge"} disabled={buttonStateDef}/>
    </div>
  )
}

export default SkillContainer