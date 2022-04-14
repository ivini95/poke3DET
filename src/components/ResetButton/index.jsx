import { useContext } from 'react'
import {ApiContextCharPoke } from "../../contexts/ApiContextCharPoke"
import { ContextCharPoke } from '../../contexts/ContextCharPoke'
import './style.css'

function ResetButton(){

  const [total, setTotal, manaLife, setManaLife] = useContext(ContextCharPoke)

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar ] = useContext(ApiContextCharPoke)

  
  function resetCharPoke(){
    setTotal(12)
    setManaLife(0)
    setCount(0)
    setResetChar(resetChar + 1)
   }
   
   console.log(resetChar);

  return (
    <div className="reset">
      <button className="button buttonReset" type="submit" onClick={resetCharPoke}>Resetar</button>
    </div>
  )
}

export default ResetButton