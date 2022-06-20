import { useContext, useEffect, useState } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import Skill from '../skill/Skill'
import './style.css'

function SkillContainer(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge] = useContext(ApiContextBattle)

  const [buttonStateAt, setButtonStateAt] = useState(true)
  const [buttonStateDef, setButtonStateDef] = useState(true)
  const [buttonStateDod, setButtonStateDod] = useState(true)

  useEffect(()=>{
    console.log("aplica verificação");
    if (possibleDodge == true) {
      setButtonStateDod(true)
    }else{
      setButtonStateDod(false)
    }
  },[charTurn])
  
  useEffect(()=>{

    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
    }

    else if (charTurn[0] == "player" && charTurn[1] == "defense" ) {
      setButtonStateAt(true)
      setButtonStateDef(false)
      
    }else if (charTurn[0] == "player" && charTurn[1] == "attack"){
      setButtonStateDef(true)
      setButtonStateAt(false)
      setButtonStateDod(true)
    }
  },[charTurn])

  useEffect(()=>{
    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
    }else if (charTurn[0] == "bot" && charTurn[1] == "defense" ) {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
    }else if (charTurn[0] == "bot" && charTurn[1] == "attack"){
      setButtonStateDef(true)
      setButtonStateAt(true)
      setButtonStateDod(true)
    }
  },[charTurn])

  useEffect(()=>{

    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
    }
  },[currentAction])

  useEffect(()=>{
    if (isTurnDamage == true) {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
    }
  },[isTurnDamage])

  useEffect(()=>{
    if (dodged == true) {
      setButtonStateDod(true)
    }
  },[dodged])
  
  return (
    <div className='skillContainer'>
      <Skill nameAction={"attack"} disabled={buttonStateAt}/>
      <Skill nameAction={"rangedAttack"} disabled={buttonStateAt}/>
      <Skill nameAction={"defend"} disabled={buttonStateDef}/>
      <Skill nameAction={"dodge"} disabled={buttonStateDod}/>
    </div>
  )
}

export default SkillContainer