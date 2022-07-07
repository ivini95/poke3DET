import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import './style.css'
import abilityIcon from '../../../../assets/images/abilityIcon.svg'
import resistenceIcon from '../../../../assets/images/resistenceIcon.svg'
import strengthIcon from '../../../../assets/images/strengthIcon.svg'
import firepowerIcon from '../../../../assets/images/firepowerIcon.svg'
import armorIcon from '../../../../assets/images/armorIcon.svg'

function AtributesProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData,totalPoints, setTotalPoints] = useContext(ApiContextProfile)


  return (
    <div className='atributesContainer'>
      <div className='atributeBackGround'>
        <img src={strengthIcon} alt="" />
        <p>-</p>
        <p>{atributesPoke.strength}</p>
      </div>
      <div className='atributeBackGround'>
        <img src={abilityIcon} alt="" />
        <p>-</p>
        <p>{atributesPoke.ability}</p>
      </div>
      <div className='atributeBackGround'>
        <img src={armorIcon} alt="" />
        <p>-</p>
        <p>{atributesPoke.armor}</p>
      </div>
      <div className='atributeBackGround'>
        <img src={resistenceIcon} alt="" />
        <p>-</p>
        <p>{atributesPoke.resistence}</p>
      </div>
      <div className='atributeBackGround'>
        <img src={firepowerIcon} alt="" />
        <p>-</p>
        <p>{atributesPoke.firePower}</p>
      </div>
    </div>
  )
}

export default AtributesProfile