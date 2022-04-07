import { useState, useContext } from "react"
import {ContextCharPoke } from "../contexts/ContextCharPoke"


function LifePoints() {

  const [total, setTotal, manaLife, setManaLife] = useContext(ContextCharPoke)

  return (
    <div className="life">
      <h2>Vida</h2>
      <div className="number">{manaLife}</div>
    </div>
  )
}

export default LifePoints