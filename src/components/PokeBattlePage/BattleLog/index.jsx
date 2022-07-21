import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp] = useContext(ApiContextBattle)

  useEffect(()=>{
    
    let textArea = document.getElementById("log")
    textArea.innerHTML = historicTemp.textLog
    
  },[historicTemp])

  useEffect(()=>{
    let textArea = document.getElementById("log")
      textArea.scrollTop = textArea.scrollHeight ;
  },[historicTemp])

  return (
    
    <div id='log' className="battleLog"></div>
    
  )
}

export default BattleLog