import { useContext } from 'react'
import {ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"
import './style.css'

function ResetButton(){

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife ] = useContext(ApiContextCharPoke)

  
  function resetCharPoke(){
    setTotal(12)
    setManaLife(0)
    setCount(0)
    setResetChar(resetChar + 1)
   }
   
  return (
    <div className="reset">
      <button className="navigateButton buttonReset" type="submit" onClick={resetCharPoke}>Resetar</button>
    </div>
  )
}

export default ResetButton