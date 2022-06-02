import { useContext, useEffect, useState } from 'react'
import { ApiContextUser } from '../../../contexts/ApiContextUser'
import './style.css'

function InputNickName() {

  const [nickName, setNickName] = useContext(ApiContextUser)

  function nickNameChange () {
    setNickName(document.getElementById('nickName').value)
  }

  return (
      <input className='inputNickName' type="text" name="nickName" id="nickName" placeholder='NickName' onChange={nickNameChange}/>
  )
}

export default InputNickName