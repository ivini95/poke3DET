import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp] = useContext(ApiContextBattle)

  useEffect(()=>{
    
    let textArea = document.getElementById("log")

    if(textArea.selectionStart == textArea.selectionEnd) {
      textArea.scrollTop = textArea.scrollHeight;
    }
 
  },[historicTemp])

  return (
    <div>
    <textarea id='log' className="battleLog" value={historicTemp.textLog} readOnly></textarea>
    </div>
  )
}

export default BattleLog