import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import './style.css'

function ImgPokeProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
      <img className='imgProfile' src={imgPoke} alt="" />
  )
}

export default ImgPokeProfile