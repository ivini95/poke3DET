import { useState, useContext, useEffect } from "react"
import {ApiContextCharPoke } from "../../contexts/ApiContextCharPoke"
import './style.css'

function NameCharPoke(){

  const [pokemons, setPokemons, count, setCount] = useContext(ApiContextCharPoke)

  const [pokeName, setPokeName] = useState('bulbasaur')
  

  useEffect(()=>{
    setPokeName(pokemons[count].name)
  },[count])
  

  function nextPokeName(){
    if (count < 19) {
      setCount(count + 1)
    }
  }

  function previousPokeName(){
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return(
    <div className="nameChange">
      <button className="button previousButton" onClick={previousPokeName}>◄</button>
      <h1 className="nameContent">{pokeName}</h1> 
      <button className="button nextButton" onClick={nextPokeName}>►</button>
    </div>
  )
} 


export default NameCharPoke