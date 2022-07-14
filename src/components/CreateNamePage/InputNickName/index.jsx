import { useContext, useEffect, useState } from 'react'
import { ApiContextUser } from '../../../contexts/ApiContextUser'
import './style.css'

function InputNickName() {

  const [nickName, setNickName] = useContext(ApiContextUser)

  const currentNick = document.getElementById('nickName')

  function nickNameChange () {
    
    setNickName(currentNick.value)
  }

  return (
      <input className='inputNickName' type="text" name="nickName" id="nickName" placeholder='NickName' onChange={nickNameChange}/>
  )
}

export default InputNickName