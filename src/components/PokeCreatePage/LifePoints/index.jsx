import { useState, useContext } from "react"
import './style.css'
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"

function LifePoints() {

  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife ] = useContext(ApiContextCharPoke)

  return (
    <div className="life">
      <h2>Vida</h2>
      <div className="number">{manaLife}</div>
    </div>
  )
}

export default LifePoints