import LogoutButton from '../../AllComponentes/LogoutButton'
import './style.css'

function NavigateProfile(){ 
  return(
    <div className='navigateContainer'>
      <button>Status</button>
      <button>batalha</button>
      <button>...</button>
      <LogoutButton/>
    </div>
  )
}

export default NavigateProfile