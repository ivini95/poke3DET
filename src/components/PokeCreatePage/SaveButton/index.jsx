import { useNavigate } from 'react-router-dom';
import './style.css'
import {db} from '../../../dataBase/firerebase.js'
import {collection, getDocs, addDoc, setDoc, doc}  from "firebase/firestore";
import { useContext, useEffect } from "react";
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke";
import {UserAuth} from '../../../contexts/AuthContext'

function SaveButton(){

  const {user} = UserAuth()

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj] = useContext(ApiContextCharPoke)

  let disabledButton = false;

  if (total > 0) {
    disabledButton = true
  }else {
    disabledButton = false
  }

  let navigate = useNavigate()
  
  useEffect(async ()=> {
    
    if (pokeRef.id == "pokemon") {
      navigate('/battle')
    } 
  }, [])

  async function savePokeData(){

    const pokeRef = await collection(db, "users", user.uid, "pokemon")
      console.log("poke não existe");
      console.log(pokeRef);
      await addDoc(collection(db, "users", user.uid, "pokemon"), {
      name: pokeName,
      caracteristics: charObj,
      life: manaLife,
      mana: manaLife,
      totalPoints: total
    });  
    navigate('/battle')
    
  } 

  return (
    <div className="save">
      <button className="button navigateButton buttonSave" type="submit" onClick={savePokeData} disabled={disabledButton}>Salvar</button>
    </div>
  )
}

export default SaveButton