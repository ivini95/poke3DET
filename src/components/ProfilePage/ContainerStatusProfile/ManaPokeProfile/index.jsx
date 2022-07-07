import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import './style.css'
import manaIcon from '../../../../assets/images/manaIcon.svg'

function ManaPokeProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
    <div className='manaContainer'>
      <img src={manaIcon} alt="imagem de coração" />
      <p>-</p>
      <p>{manaPoke}/{manaPoke}</p>
    </div>
  )
}

export default ManaPokeProfile