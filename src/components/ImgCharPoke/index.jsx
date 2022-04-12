import { useContext, useEffect,useState } from "react"
import { ApiContextCharPoke } from "../../contexts/ApiContextCharPoke"
import './style.css'

function ImgCharPoke(){


  const [pokemons, setPokemons, count, setCount, urlPoke, setUrlPoke] = useContext(ApiContextCharPoke)


  useEffect(()=>{
    setTimeout(() => {
      setUrlPoke(pokemons[count].url)
    }, 1);
    
  },[count])
  
  
  return (
    <div className="imagePokeContainer">
      <img className="imagePoke" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${count + 1}.png`} alt={'pokemon image'} />
    </div>
  )
}

export default ImgCharPoke