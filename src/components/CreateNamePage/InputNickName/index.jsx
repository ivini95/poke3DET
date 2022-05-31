import { useContext, useEffect, useState } from 'react'
import { ApiContextUser } from '../../../contexts/ApiContextUser'
import './style.css'

function InputNickName() {

  const nickNameValue = document.getElementById('nickName')

  const [nickName, setNickName] = useContext(ApiContextUser)

  function nickNameChange () {
    setNickName(nickNameValue.value)
  }

  return (
      <input className='inputNickName' type="text" name="nickName" id="nickName" placeholder='NickName' onChange={nickNameChange}/>
      
  )
}

export default InputNickName