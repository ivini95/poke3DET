import LogoutButtonProfile from './LogoutButtonProfile'
import BattleButon from './BattleButon'
import './style.css'
import profileIcon from '../../../assets/images/profileIcon.svg'
import DeletePokeButton from './DeletePokeButton'

function NavigateProfile(){ 
  return(
    <div className='navigateContainer'>
      <img src={profileIcon} alt="simbolo de pessoa" />
      <BattleButon/>
      <DeletePokeButton/>
      <LogoutButtonProfile/>
    </div>
  )
}

export default NavigateProfile