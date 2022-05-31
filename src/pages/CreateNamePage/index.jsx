
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../../components/AllComponentes/LogoutButton/'
import ButtonCreate from '../../components/CreateNamePage/ButtonCreate'
import InputNickName from '../../components/CreateNamePage/InputNickName'
import { UserAuth } from '../../contexts/AuthContext'
import './style.css'

function CreateNamePage() {

  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  /* useEffect(()=> {
    if (user == null) {
      navigate('/')
    }
  }, [user])  */

  return (
    <div className="createNameContainer">
      <InputNickName/>
      <div className='buttonContainer'>
        <LogoutButton/>
        <ButtonCreate/>
      </div>
    </div>
  )
}

export default CreateNamePage