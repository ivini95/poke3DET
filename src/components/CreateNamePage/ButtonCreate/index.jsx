import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContextUser } from '../../../contexts/ApiContextUser';
import { UserAuth } from '../../../contexts/AuthContext';
import { db } from '../../../dataBase/firerebase';
import './style.css'

function ButtonCreate() {

  let navigate = useNavigate()

  const [nickName, setNickName] = useContext(ApiContextUser)
  const { googleSignIn, user } = UserAuth()
  
  const userRef = collection(db, "users")

  useEffect(async ()=> {
    const usersSnap = await getDocs(userRef)
    if (usersSnap.nickName) {
      navigate('/createpoke')
    }
  }, [])

  async function saveNickName(){
    await setDoc(doc(userRef, user.uid), {
        nickName: nickName
      }); 
    navigate('/createpoke')
  }

  return (
    <button className='button navigateButton createButton' onClick={saveNickName}>Criar</button>
  )
}

export default ButtonCreate