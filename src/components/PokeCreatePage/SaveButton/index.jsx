import { useNavigate } from 'react-router-dom';
import './style.css'
import {db} from '../../../dataBase/firerebase.js'
import {collection, getDocs, addDoc, doc, setDoc}  from "firebase/firestore";
import { useContext, useEffect } from "react";
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke";
import {UserAuth} from '../../../contexts/AuthContext'
import { useState } from 'react';


function SaveButton(){

  const {user} = UserAuth()

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke] = useContext(ApiContextCharPoke)

  const [zeroedStatus, setZeroedStatus] = useState(true)

  let disabledButton = true;

  if (total > 0  && zeroedStatus == true) {
    disabledButton = true
  }else if (total == 0  && zeroedStatus == false) {
    disabledButton = false
  } 

  let navigate = useNavigate()

  useEffect(()=>{
    Object.keys(charObj).forEach((char) => {
      let charPoint = charObj[char]
      if (charPoint != 0) {
        setZeroedStatus(false)
      }else if(charPoint == 0){
        setZeroedStatus(true)
      }
    })
    
  },[charObj])

  
  async function savePokeData(){

    if (total == 0  && zeroedStatus == false) {
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
    }
    
  } 

  return (
    <div className="save">
      <button className="navigateButton buttonSave" type="submit" onClick={savePokeData} disabled={disabledButton}>Salvar</button>
    </div>
  )
}

export default SaveButton