import LogoutButtonProfile from './LogoutButtonProfile'
import BattleButon from './BattleButon'
import './style.css'
import delPoke from '../../../assets/images/delPokeIcon.svg'
import profileIcon from '../../../assets/images/profileIcon.svg'

function NavigateProfile(){ 
  return(
    <div className='navigateContainer'>
      <img src={profileIcon} alt="simbolo de pessoa" />
      <BattleButon/>
      <img src={delPoke} alt="simbolo de pessoa com x ao lado" />
      <LogoutButtonProfile/>
    </div>
  )
}

export default NavigateProfile