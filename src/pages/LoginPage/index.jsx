import LoginButton from "../../components/LoginPage/LoginButton/LoginButton"
import './style.css'
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect} from 'react'
import {UserAuth} from '../../contexts/AuthContext'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../dataBase/firerebase"
import { ApiContextUser } from "../../contexts/ApiContextUser"

function LoginPage() {

  const {user } = UserAuth()
  const navigate = useNavigate()

  useEffect( async () => {

    const userRef = collection(db, "users")
    const usersSnap = await getDocs(userRef)
    
    let userExist = false;

    const docRef = doc(db, "users", user.uid);
    
    if (user != null) {
      if (user.uid) {    

        usersSnap.forEach(async (element) => {
          if (element.id == user.uid) {
            userExist = true
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap.nickName) {
              console.log('redirect');
              navigate('/createpoke')
            }else {
              navigate('/createnick')
            }
                
          }
          
        })
        
        if (userExist == false) {
          userExist = true
          await setDoc(doc(userRef, user.uid), {nickName: ""});
          navigate('/createnick')
        }
        
        }
    }
  },[user])

  return (
    
    <div className="loginContainer">
      <LoginButton/>
    </div>
  )
}

export default LoginPage