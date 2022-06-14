import { useContext, useEffect, useState } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import Skill from '../skill/Skill'
import './style.css'

function SkillContainer(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase] = useContext(ApiContextBattle)

  const [buttonStateAt, setButtonStateAt] = useState(true)
  const [buttonStateDef, setButtonStateDef] = useState(true)
  
  useEffect(()=>{

    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
    }

    else if (charTurn[0] == "player" && charTurn[1] == "defense" ) {
      setButtonStateAt(true)
      setButtonStateDef(false)
    }else if (charTurn[0] == "player" && charTurn[1] == "attack"){
      setButtonStateDef(true)
      setButtonStateAt(false)
    }
  },[charTurn])

  useEffect(()=>{

    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
    }
  },[currentAction])

  useEffect(()=>{
    if (isTurnDamage == true) {
      setButtonStateAt(true)
      setButtonStateDef(true)
    }
  },[isTurnDamage])
  
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