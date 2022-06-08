import { useState, useContext, useEffect } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css';

function DiceBattle(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn] = useContext(ApiContextBattle)

  let historicTempCopy = {...historicTemp};

  const[turn, setTurn] = useState(0)

  function generateValue() {
    if (currentAction != "") {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomNumber)
      historicTempCopy.id ++
      historicTempCopy.diceValue = randomNumber
      setHistoricTemp({...historicTemp,...historicTempCopy})
      setTurn(historicTempCopy.id);
    }
  }

  useEffect(()=> {
    if (turn > 0) {
      action()
    }
  },[turn])
  
  return (
    <div className='diceBattle'>
      <img className='diceImg' onClick={generateValue} src={`src/assets/images/dice/dice${diceValue}.svg`} alt="" />
    </div>
  )
}

export default DiceBattle