import {useContext} from "react"
import './style.css'
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"

function TotalPoints(){


  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife ] = useContext(ApiContextCharPoke)

  return(
    
    <div className="totalPoints">
      <h1 >Total</h1>
      <div className="number">{total}</div>
    </div>
    
  )
}

export default TotalPoints