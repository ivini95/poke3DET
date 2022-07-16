import { deleteDoc, doc } from 'firebase/firestore'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import { UserAuth } from '../../../../contexts/AuthContext'
import { db } from '../../../../dataBase/firerebase'
import './style.css'

function PopUpDeletePoke(){

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData,totalPoints, setTotalPoints,logOutConfirm, setLogOutConfirm,deletePokePopUp, setDeletePokePopUp] = useContext(ApiContextProfile)

  const {user} = UserAuth()

  const navigate = useNavigate()
 
  function closePopUpLogOut(){
    setDeletePokePopUp(false)
  }

  async function deletePoke(){
    await deleteDoc(doc(db,"users",user.uid,"pokemon","01"));
    navigate('/createPoke')
  }

  return(
    <div className='deletePokePopUp'>
      <div>Apagar Pokemon?</div>
      <button onClick={deletePoke}>Yep!</button>
      <button onClick={closePopUpLogOut}>NOP!</button>
    </div>
  )
}

export default PopUpDeletePoke