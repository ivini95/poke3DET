import { useState, useContext, useEffect } from "react"
import {ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"
import leftArrow from '../../../assets/images/leftArrowRed.svg'
import rightArrow from '../../../assets/images/rightArrowRed.svg'
import './style.css'

function NameCharPoke(){

  const [pokemons, setPokemons, count, setCount, urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName ] = useContext(ApiContextCharPoke)

  useEffect(()=>{
    setPokeName(pokemons[count].name)
    valueNameId.value = count
  },[count])


  function nextPokeName(){
    if (count < pokemons.length - 1) {
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
      <div className="rangeBarContainer">
      <input className="rangeBar" type="range" name="" id="valueNameId" min={0} max={pokemons.length - 1} onChange={()=> setCount(parseInt(valueNameId.value))}/>
      <h2 className="number countNumber">{count + 1}</h2>
      </div>
      <div className="nameChangeFooter">
      <button className="button previousButton" onClick={previousPokeName}><img src={leftArrow} alt="" /></button>
      <h1 className="nameContent">{pokeName}</h1> 
      <button className="button nextButton" onClick={nextPokeName}><img src={rightArrow} alt="" /></button>
      </div>
    </div>
  )
} 


export default NameCharPoke