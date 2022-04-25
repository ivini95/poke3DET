import { useState, useContext, useEffect } from "react"
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"
import {ContextCharPoke } from "../../../contexts/ContextCharPoke"
import './style.css'


function ButtonChar(props){

  const [total, setTotal, manaLife, setManaLife] = useContext(ContextCharPoke)

  const [typeChar, setTypeChar] = useState(props.typeChar)

  const [char, setChar] = useState(props.value)

  const [className, setClassName] = useState(props.className)
  
  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar ] = useContext(ApiContextCharPoke)

  useEffect(()=>{
    setChar(0)
  },[resetChar])

  function moreChar(){

    if (total > 0 && char < 5) {
      setChar((prevState)=> prevState + 1)
      setTotal( (prevState)=> prevState - 1)
      if ( typeChar == 'Resistência') {
        setManaLife((prevState)=> prevState + 5)
      }

    }
    
  }

  function lessChar(){

    if (total < 12 && char >= 1) {
      setChar((prevState)=> prevState - 1)
      setTotal((prevState)=> prevState + 1)
      if ( typeChar == 'Resistência') {
        setManaLife((prevState)=> prevState - 5)
      }
    }
    
  }

    return(

      <div className={className}>
        <h1>{typeChar}</h1>
        <div className="containerButtonChar">
          <button className="buttonCharacteristc button" onClick={lessChar}>-</button>
          <div className="number">{char}</div>
          <button className="buttonCharacteristc button" onClick={moreChar}>+</button>
        </div>
      </div>
    )

  
}

export default ButtonChar