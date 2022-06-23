import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp] = useContext(ApiContextBattle)

  return (
    <div>
    <textarea className="battleLog" value={historicTemp.textLog} readOnly></textarea>
    </div>
  )
}

export default BattleLog