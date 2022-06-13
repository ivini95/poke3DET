import { useState, useContext, useEffect } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css';

export function DiceBattle(){
  

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling] = useContext(ApiContextBattle)

  let historicTempCopy = {...historicTemp};

  const[turn, setTurn] = useState(0)

  function generateValue() {
    if (diceRolling == false) {
      if (currentAction != "") {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        rotateDice(randomNumber)
        setDiceValue(randomNumber)
        setTimeout(() => {
          historicTempCopy.id ++
          historicTempCopy.diceValue = randomNumber
          setHistoricTemp({...historicTemp,...historicTempCopy})
          setTurn(historicTempCopy.id);
        }, 2010);
        
      }
    }
  }

  useEffect(()=> {
    if (turn > 0) {
      action()
    }
  },[turn])

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