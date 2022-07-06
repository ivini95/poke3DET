import { useNavigate } from 'react-router-dom';
import './style.css'
import {db} from '../../../dataBase/firerebase.js'
import {collection, getDocs, addDoc, doc, setDoc}  from "firebase/firestore";
import { useContext, useEffect } from "react";
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke";
import {UserAuth} from '../../../contexts/AuthContext'


function SaveButton(){

  const {user} = UserAuth()

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke] = useContext(ApiContextCharPoke)

  let disabledButton = false;

  if (total > 0) {
    disabledButton = true
  }else {
    disabledButton = false
  }

  let navigate = useNavigate()
  
  
  async function savePokeData(){

    const pokeRef = collection(db, "users", user.uid, "pokemon")
      await setDoc(doc(pokeRef, "01"), {
      name: pokeName,
      characteristics: charObj,
      life: manaLife,
      mana: manaLife,
      totalPoints: total,
      img: imgPoke
    });  
    navigate('/profile')
    
  } 

  return (
    <div className="save">
      <button className="navigateButton buttonSave" type="submit" onClick={savePokeData} disabled={disabledButton}>Salvar</button>
    </div>
  )
}

export default SaveButton