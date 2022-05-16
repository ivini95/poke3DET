import { useState, useContext } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css';

function DiceBattle(){

  const [diceValue , setDiceValue] = useContext(ApiContextBattle)

  function generateValue() {

    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomNumber)
    // battleLog(randomNumber);
  }

  return (
    <div className='diceBattle'>
      <img className='diceImg' onClick={generateValue} src={`src/assets/images/dice/dice${diceValue}.svg`} alt="" />
    </div>
  )
}

export default DiceBattle