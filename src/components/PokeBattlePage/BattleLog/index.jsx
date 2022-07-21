import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp] = useContext(ApiContextBattle)

  useEffect(()=>{
    
    let textArea = document.getElementById("log")

    if(textArea.selectionStart == textArea.selectionEnd) {
      textArea.scrollTop = textArea.scrollHeight ;
    }
    
    textArea.innerHTML = historicTemp.textLog
    
  },[historicTemp])

  return (
    
    <div id='log' className="battleLog"></div>
    
  )
}

export default BattleLog