import { useContext } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'


function BattleLog(){

  return (
    <div>
    <textarea className="battleLog" value={'teste'} readOnly/>
    </div>
  )
}

export default BattleLog