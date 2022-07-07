import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import './style.css'
import lifeIcon from '../../../../assets/images/lifeIcon.svg'

function LifePokeProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
    <div className='lifeContainer'>
      <img src={lifeIcon} alt="imagem de coração" />
      <p>-</p>
      <p>{lifePoke}/{lifePoke}</p>
    </div>
  )
}

export default LifePokeProfile