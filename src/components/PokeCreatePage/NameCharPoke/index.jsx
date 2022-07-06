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
      <div className="nameBarContainer">
      <h1 className="nameContent">{pokeName}</h1> 
      <h2 className="countNumber">{count + 1}</h2>
      </div>
      <div className="nameChangeFooter">
      <button className="previousButton" onClick={previousPokeName}><img className="imgArrow" src={leftArrow} alt="" /></button>
      <input className="nameBar" type="range" name="" id="valueNameId" min={0} max={pokemons.length - 1} onChange={()=> setCount(parseInt(valueNameId.value))}/>
      <button className="nextButton" onClick={nextPokeName}><img className="imgArrow" src={rightArrow} alt="" /></button>
      </div>
    </div>
  )
} 


export default NameCharPoke