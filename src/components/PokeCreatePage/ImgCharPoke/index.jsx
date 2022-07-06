import { useContext} from "react"
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"
import './style.css'
import baseImg from '../../../assets/images/baseImg.svg'

function ImgCharPoke(){


  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke ] = useContext(ApiContextCharPoke)


  return (

    <div className="imagePokeContainer">
      <img className="imagePoke" src={imgPoke} alt={'pokemon image'} />
      <img className="baseImg" src={baseImg} alt="efeito de sobra da imagem" />
    </div>
  )
}

export default ImgCharPoke