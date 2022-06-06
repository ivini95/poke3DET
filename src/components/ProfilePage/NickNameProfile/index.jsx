import { useContext } from 'react'
import { ApiContextProfile } from '../../../contexts/ApiContextProfile'
import './style.css'

function NickNameProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
    <div className='nickNameContainer'>
      <p>{nickName}</p>
    </div>
  )
}

export default NickNameProfile