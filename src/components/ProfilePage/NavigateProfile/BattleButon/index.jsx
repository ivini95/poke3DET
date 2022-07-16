import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile';
import './style.css'
import battleIcon from '../../../../assets/images/battleIcon.svg'


function BattleButon() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData] = useContext(ApiContextProfile)


  function toBattle(){
    verifyTempData()
  }

  return (
    <img className='profileButtonIcon' src={battleIcon} alt="" onClick={toBattle}/>
  )
}

export default BattleButon