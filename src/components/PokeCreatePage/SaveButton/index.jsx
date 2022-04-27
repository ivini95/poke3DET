import { useNavigate } from 'react-router-dom';
import './style.css'
import {db} from '../../../dataBase/firerebase.js'
import {collection, getDocs, addDoc}  from "firebase/firestore";
import { useContext } from "react";
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke";

function SaveButton(){

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj] = useContext(ApiContextCharPoke) 

  let navigate = useNavigate()

  async function save(){
      /* await addDoc(collection(db, "pokeChars"), {
        name: pokeName,
        caracteristics: charObj,
        life: manaLife,
        mana: manaLife,
        totalPoints: total
      });  */
      console.log("PokeCreate");
      navigate('/battle')
  }

  return (
    <div className="save">
      <button className="button buttonSave" type="submit"  onClick={save} >Salvar</button>
    </div>
  )
}

export default SaveButton