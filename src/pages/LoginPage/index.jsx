import LoginButton from "../../components/LoginPage/LoginButton/LoginButton"
import './style.css'
import {useNavigate} from 'react-router-dom'
import {  useEffect} from 'react'
import {UserAuth} from '../../contexts/AuthContext'
import { collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore"
import { db } from "../../dataBase/firerebase"
import TitleMain from "../../components/MainPage/TitleMain"
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"

function LoginPage() {

  const {user} = UserAuth()
  const navigate = useNavigate()

  useEffect( async () => {

    const userRef = collection(db, "users")
    const usersSnap = await getDocs(userRef)
    
    let userExist = false;
    
    if (user != null) {
      if (user.uid) {    

        usersSnap.forEach(async (element) => {
          if (element.id == user.uid) {
            userExist = true
            const docRef = doc(db, "users", user.uid);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap.nickName) {
              const pokeRef =  collection(db, "users", user.uid,"pokemon")
              const snapPokeRef = await getDocs(pokeRef)
              if (snapPokeRef.size > 0) {
                navigate('/profile')
            } else{
              navigate('/createpoke')
            }
             
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
      <div className="topContainerLogin">
        <TitleMain/>
        <div className="themeIconLogin">
        <ThemeIcon/>
        </div>
      </div>
      <LoginButton/>
    </div>
  )
}

export default LoginPage