
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../../components/AllComponentes/LogoutButton/'
import ButtonCreate from '../../components/CreateNamePage/ButtonCreate'
import InputNickName from '../../components/CreateNamePage/InputNickName'
import { ApiProviderUser } from '../../contexts/ApiContextUser'
import { UserAuth } from '../../contexts/AuthContext'
import './style.css'

function CreateNamePage() {

  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  return (
    <ApiProviderUser>
      <div className="createNameContainer">
        <InputNickName/>
        <div className='buttonContainer'>
          <LogoutButton/>
          <ButtonCreate />
        </div>
      </div>
    </ApiProviderUser>
  )
}

export default CreateNamePage