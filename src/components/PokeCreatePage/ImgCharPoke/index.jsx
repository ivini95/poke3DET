import { useContext, useEffect, useState  } from "react"
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"
import './style.css'

function ImgCharPoke(){


  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke ] = useContext(ApiContextCharPoke)


  return (

    <div className="imagePokeContainer">
      <img className="imagePoke" src={imgPoke} alt={'pokemon image'} />
    </div>
  )
}

export default ImgCharPoke