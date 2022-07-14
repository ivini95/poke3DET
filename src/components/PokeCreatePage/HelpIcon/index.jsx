import './style.css'

import helpIcon from '../../../assets/images/helpIcon.svg'
import { useContext, useState } from 'react';
import { ApiContextCharPoke } from '../../../contexts/ApiContextCharPoke';

function HelpIcon(){

  const [ pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke,popupOpen,setPopupOpen ] = useContext(ApiContextCharPoke)

  function openHelpPopup(){
    setPopupOpen(!popupOpen)
  }

  return (
        <img className='iconImgHelp' onClick={openHelpPopup} src={helpIcon} alt="icone de ponto de interrogação" />
  )
}

export default HelpIcon