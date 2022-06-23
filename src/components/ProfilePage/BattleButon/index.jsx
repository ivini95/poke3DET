import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ApiContextProfile } from '../../../contexts/ApiContextProfile';
import './style.css'


function BattleButon() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData] = useContext(ApiContextProfile)

  const navigate = useNavigate()

  function toBattle(){
    verifyTempData()
  }

  return (
    <button onClick={toBattle}>Batalha</button>
  )
}

export default BattleButon