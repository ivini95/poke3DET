import { useContext, useEffect, useState } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import QuitButton from '../QuitButton'
import Skill from '../skill/Skill'
import './style.css'
import leftArrow from '../../../assets/images/leftMiniArrow.svg'
import rightMiniArrow from '../../../assets/images/rightMiniArrow.svg'


function SkillContainer(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge] = useContext(ApiContextBattle)

  const [buttonStateAt, setButtonStateAt] = useState(true)
  const [buttonStateDef, setButtonStateDef] = useState(true)
  const [buttonStateDod, setButtonStateDod] = useState(true)
  const [buttonQuit, setButtonQuit] = useState(true)

  useEffect(()=>{
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
      setButtonQuit(true)
    }

    else if (charTurn[0] == "player" && charTurn[1] == "defense" ) {
      setButtonStateAt(true)
      setButtonStateDef(false)
      setButtonQuit(false)
    }else if (charTurn[0] == "player" && charTurn[1] == "attack"){
      setButtonStateDef(true)
      setButtonStateAt(false)
      setButtonStateDod(true)
      setButtonQuit(false)
    }
  },[charTurn])

  useEffect(()=>{
    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
      setButtonQuit(true)
    }else if (charTurn[0] == "bot" && charTurn[1] == "defense" ) {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
      setButtonQuit(true)
    }else if (charTurn[0] == "bot" && charTurn[1] == "attack"){
      setButtonStateDef(true)
      setButtonStateAt(true)
      setButtonStateDod(true)
      setButtonQuit(true)
    }
  },[charTurn])

  useEffect(()=>{

    if(currentAction == "initiative") {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
      setButtonQuit(true)
    }
  },[currentAction])

  useEffect(()=>{
    if (isTurnDamage == true) {
      setButtonStateAt(true)
      setButtonStateDef(true)
      setButtonStateDod(true)
      setButtonQuit(true)
    }
  },[isTurnDamage])

  useEffect(()=>{
    if (dodged == true) {
      setButtonStateDod(true)
    }
  },[dodged])
  
  return (
    <div className='skillContainer'>
      {/* <img className='leftMiniArrow' src={leftArrow} alt="" /> */}
      <Skill nameAction={"attack"} disabled={buttonStateAt}/>
      <Skill nameAction={"rangedAttack"} disabled={buttonStateAt}/>
      <Skill nameAction={"defend"} disabled={buttonStateDef}/>
      <Skill nameAction={"dodge"} disabled={buttonStateDod}/>
      <QuitButton disabled={buttonQuit}/>
      {/* <img className='rightMiniArrow' src={rightMiniArrow} alt="" /> */}
    </div>
  )
}

export default SkillContainer