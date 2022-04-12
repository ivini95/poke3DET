import { useState, useContext } from "react"
import {ContextCharPoke } from "../../contexts/ContextCharPoke"
import './style.css'

function ManaPoints() {

  const [total, setTotal, manaLife, setManaLife] = useContext(ContextCharPoke)

  return (
    <div className="mana">
      <h2>Mana</h2>
      <div className="number">{manaLife}</div>
    </div>
  )
}

export default ManaPoints