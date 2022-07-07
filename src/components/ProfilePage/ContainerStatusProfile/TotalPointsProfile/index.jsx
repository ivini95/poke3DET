import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import './style.css'
import totalPointsIcon from '../../../../assets/images/totalPointsIcon.svg'

function TotalPointsProfile() {


  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData,totalPoints, setTotalPoints] = useContext(ApiContextProfile)

  return (
    <div className='totalContainer'>
      <img src={totalPointsIcon} alt="imagem de letras T e P" />
      <p>-</p>
      <p>{totalPoints}</p>
    </div>
  )
}

export default TotalPointsProfile