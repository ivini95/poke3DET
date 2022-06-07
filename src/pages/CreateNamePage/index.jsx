import { doc, getDoc } from 'firebase/firestore'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../../components/AllComponentes/LogoutButton/'
import ButtonCreate from '../../components/CreateNamePage/ButtonCreate'
import InputNickName from '../../components/CreateNamePage/InputNickName'
import { ApiProviderUser } from '../../contexts/ApiContextUser'
import { UserAuth } from '../../contexts/AuthContext'
import { db } from '../../dataBase/firerebase'
import './style.css'

function CreateNamePage() {

  const {user} = UserAuth()

  const navigate = useNavigate()

  useEffect(async ()=> {
    if (user.uid) {
      const userRef = doc(db, "users", user.uid)
      const usersSnap = (await getDoc(userRef)).data()

      if (usersSnap.nickName) {
        navigate('/createpoke')
    }
    }
    
  }, [user]) 


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