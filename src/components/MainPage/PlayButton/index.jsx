import './style.css'
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../../../contexts/AuthContext'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../../dataBase/firerebase'

function PlayButton() {

  const {user} = UserAuth()
  let navigate = useNavigate()
  

  async function loggedIn(){
    
    if (user != null) {
      const userRef = collection(db, "users")
      const usersSnap = await getDocs(userRef)
      let userExist = false;
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
    }else{
      navigate('/login')
    }
    
  }

  


    return (
    <button onClick={loggedIn} className="button navigateButton playButton" >Jogar</button>
  )  

 
}

export default PlayButton