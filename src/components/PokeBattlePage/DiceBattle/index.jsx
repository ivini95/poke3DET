import { useState, useContext } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css'

function DiceBattle(){

  const [diceValue , setDiceValue] = useContext(ApiContextBattle)

  function generateValue() {

    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomNumber)
    // battleLog(randomNumber);
  }

  return (
    <div className='diceBattle'>
      <h1 onClick={generateValue}>{diceValue}</h1>
    </div>
  )
}

export default DiceBattle