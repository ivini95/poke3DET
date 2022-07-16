import './style.css'
import delPoke from '../../../../assets/images/delPokeIcon.svg'
import PopUpDeletePoke from '../PopUpDeletePoke';
import { useContext } from 'react';
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile';

function DeletePokeButton(){

  

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData, verifyTempData,totalPoints, setTotalPoints,logOutConfirm, setLogOutConfirm,deletePokePopUp, setDeletePokePopUp] = useContext(ApiContextProfile)

  function deletePokeConfirm(){
    setDeletePokePopUp(!deletePokePopUp)
  }

  

  return (
    <div>
      {deletePokePopUp == true ? <PopUpDeletePoke/> : <></>}
      <img className='profileButtonIcon' src={delPoke} onClick={deletePokeConfirm} alt="simbolo de pessoa com x ao lado" />
    </div>
    
  )
}

export default DeletePokeButton