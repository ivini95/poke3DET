import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp] = useContext(ApiContextBattle)

  let historicTempCopy = {...historicTemp};

  useEffect(()=>{
    historicTempCopy.text = `Resultado Dado:${historicTemp.diceValue}\n`
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
  },[historicTemp.id])

  return (
    <div>
    <textarea className="battleLog" value={historicTemp.textLog} scrollHeight readOnly></textarea>
    </div>
  )
}

export default BattleLog