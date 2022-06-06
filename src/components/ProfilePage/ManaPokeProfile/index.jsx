import { useContext } from 'react'
import { ApiContextProfile } from '../../../contexts/ApiContextProfile'
import './style.css'

function ManaPokeProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
    <div className='manaContainer'>
      <p>{manaPoke}</p>
    </div>
  )
}

export default ManaPokeProfile