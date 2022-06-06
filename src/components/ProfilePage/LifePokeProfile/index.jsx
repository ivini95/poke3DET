import { useContext } from 'react'
import { ApiContextProfile } from '../../../contexts/ApiContextProfile'
import './style.css'

function LifePokeProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
    <div className='lifeContainer'>
      <p>{lifePoke}</p>
    </div>
  )
}

export default LifePokeProfile