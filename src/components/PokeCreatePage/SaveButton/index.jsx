import { useNavigate } from 'react-router-dom';
import './style.css'
import {db} from '../../../dataBase/firerebase.js'
import {collection, getDocs, addDoc}  from "firebase/firestore";


function SaveButton(){

  let navigate = useNavigate()

  async function save(){
      await addDoc(collection(db, "pokeChars"), {
        name: "",
        caracteristics: 
          {'strength': 0,
          'ability': 0,
          'resistence': 0,
          'armor': 0,
          'firePower': 0},
        life: 0,
        mana: 0,
        totalPoints: 12
      });
      console.log("PokeCreate");
    navigate('/battle')
  }

  return (
    <div className="save">
      <button className="button buttonSave" type="submit" onClick={save}>Salvar</button>
    </div>
  )
}

export default SaveButton