import { collection, doc, documentId, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContextUser } from '../../../contexts/ApiContextUser';
import { UserAuth } from '../../../contexts/AuthContext';
import { db } from '../../../dataBase/firerebase';
import PopUpNickName from '../PopUpNickName';
import './style.css'

function ButtonCreate() {

  let navigate = useNavigate()

  const [nickName, setNickName] = useContext(ApiContextUser)
  

  const {user} = UserAuth()
  
  const userRef = collection(db, "users")

  const [popUpNickName, setPopupNickName] = useState(false)
  
  async function saveNickName(){
    
    if (nickName.length > 4 && nickName.length < 9) {
      console.log(nickName);
      if (user.uid) {
        await setDoc(doc(userRef, user.uid), {
          nickName: nickName
        }); 
        /* if (total == 0  && zeroedStatus == false) {
          const pokeRef = collection(db, "users", user.uid, "pokemon")
          await setDoc(doc(pokeRef, "01"), {
          name: pokeName,
          characteristics: charObj,
          life: manaLife,
          mana: manaLife,
          totalPoints: 12,
          img: imgPoke
        });  
        navigate('/profile')
        }else{ */
          navigate('/createpoke')
        /* } */
        
      }
    }else {
      setPopupNickName(true)
      setTimeout(() => {
        setPopupNickName(false)
      }, 1500);
    }
  }

  return (
    <div>
        {popUpNickName == true ? <PopUpNickName/> : <></>}
        <button className='button navigateButton createButton' onClick={saveNickName}>Criar</button>
    </div>
    
  )
}

export default ButtonCreate