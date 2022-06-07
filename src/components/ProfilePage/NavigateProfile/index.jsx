import LogoutButton from '../../AllComponentes/LogoutButton'
import BattleButon from '../BattleButon'
import './style.css'

function NavigateProfile(){ 
  return(
    <div className='navigateContainer'>
      <button>Status</button>
      <BattleButon/>
      <button>Refazer Pokemon</button>
      <LogoutButton/>
    </div>
  )
}

export default NavigateProfile