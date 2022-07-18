import { useState, useContext, useEffect } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css';

export function DiceBattle(){
  

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle,quitBattle,diceInitiativeBot] = useContext(ApiContextBattle)

  useEffect(()=>{
    if (charTurn && charTurn != undefined) {
      if (charTurn[0] == "bot") {
          const diceBot = document.getElementById('cube')
          const diceFaces = diceBot.children
          for (let face of diceFaces) {
            face.style.backgroundColor = '#F6455Cff'
          }
        }
        else{
        const diceBot = document.getElementById('cube')
        const diceFaces = diceBot.children
        for (let face of diceFaces) {
          face.style.backgroundColor = '#7DA8B6ff'
        }
      }
    }

    
  },[charTurn])

   useEffect(()=>{
    
    if (diceInitiativeBot == true) {
      console.log('teste');
      const diceBot = document.getElementById('cube')
      const diceFaces = diceBot.children
      for (let face of diceFaces) {
        face.style.backgroundColor = '#F6455Cff'
      }
    }
  },[diceInitiativeBot]) 

  return (
    
    <section className="container">
      <div id="cube"  onClick={generateValue}>
        <div className="front">
          <span className="dot dot1"></span>
        </div>
        <div className="back">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
        </div>
        <div className="right">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
        </div>
        <div className="left">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
        </div>
        <div className="top">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
          <span className="dot dot5"></span>
        </div>
        <div className="bottom">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
          <span className="dot dot5"></span>
          <span className="dot dot6"></span>
        </div>
      </div>
    </section>

  )
}

export default DiceBattle