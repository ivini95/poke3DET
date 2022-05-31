import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContextUser } from '../../../contexts/ApiContextUser';
import './style.css'

function ButtonCreate() {

  let navigate = useNavigate()

  const [nickName, setNickName] = useContext(ApiContextUser)

  function saveNickName(){
    console.log(nickName);
    navigate('/')
  }

  return (
    <button className='button navigateButton createButton' onClick={saveNickName}>Criar</button>
  )
}

export default ButtonCreate