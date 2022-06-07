import { collection, doc, setDoc } from 'firebase/firestore';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContextUser } from '../../../contexts/ApiContextUser';
import { UserAuth } from '../../../contexts/AuthContext';
import { db } from '../../../dataBase/firerebase';
import './style.css'

function ButtonCreate() {

  let navigate = useNavigate()

  const [nickName, setNickName] = useContext(ApiContextUser)

  const {user} = UserAuth()
  
  const userRef = collection(db, "users")

  async function saveNickName(){
    
    if (nickName != "") {
      if (user.uid) {
        await setDoc(doc(userRef, user.uid), {
          nickName: nickName
        }); 
        navigate('/createpoke')
      }
    }
  }

  return (
    <button className='button navigateButton createButton' onClick={saveNickName}>Criar</button>
  )
}

export default ButtonCreate