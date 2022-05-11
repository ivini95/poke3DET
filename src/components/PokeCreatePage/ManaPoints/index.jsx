import {useContext } from "react"
import './style.css'
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"

function ManaPoints() {

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife ] = useContext(ApiContextCharPoke)

  return (
    <div className="mana">
      <h2>Mana</h2>
      <div className="number manaNumber">{manaLife}</div>
    </div>
  )
}

export default ManaPoints