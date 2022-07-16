import './style.css'
import logout from '../../../../assets/images/logOut.svg'
import PopUpLogOut from '../PopUpLogOut';
import { useContext, useState } from 'react';
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile';

function logoutButtonProfile(){
  
  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData,totalPoints, setTotalPoints,logOutConfirm, setLogOutConfirm,deletePokePopUp, setDeletePokePopUp] = useContext(ApiContextProfile)


  function popUpLogOutConfirm(){
    setLogOutConfirm(!logOutConfirm)
  }


  return (
    <div className='logoutContainer'>
      {logOutConfirm == true ? <PopUpLogOut/> : <></>}
      <img className='profileButtonIcon buttonLogoutProfile' src={logout} alt="" onClick={popUpLogOutConfirm} />
    </div>
    

  )
}

export default logoutButtonProfile