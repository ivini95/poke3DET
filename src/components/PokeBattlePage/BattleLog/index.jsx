import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp] = useContext(ApiContextBattle)

  let historicTempCopy = {...historicTemp};

  useEffect(()=>{
    historicTempCopy.text = `Resultado Dado:${historicTemp.diceValue}`
    setHistoricTemp({...historicTemp,...historicTempCopy})
  },[historicTemp.id])

  

  return (
    <div>
    <textarea className="battleLog" value={historicTemp.text} readOnly></textarea>
    </div>
  )
}

export default BattleLog