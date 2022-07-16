import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import { UserAuth } from '../../../../contexts/AuthContext'
import './style.css'

function PopUpLogOut(){

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData,totalPoints, setTotalPoints,logOutConfirm, setLogOutConfirm] = useContext(ApiContextProfile)

  const {user, logOut} = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      
    }
  }

  function closePopUpLogOut(){
    setLogOutConfirm(false)
  }

  return(
    <div className='logOutPopUp'>
      <div>Deslogar?</div>
      <button onClick={handleSignOut}>Yep!</button>
      <button onClick={closePopUpLogOut}>NOP!</button>
    </div>
  )
}

export default PopUpLogOut