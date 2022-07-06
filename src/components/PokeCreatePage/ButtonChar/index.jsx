import { useState, useContext, useEffect } from "react"
import { ApiContextCharPoke } from "../../../contexts/ApiContextCharPoke"
import minusSign from '../../../assets/images/minusSignRed.svg'
import plusSign from '../../../assets/images/plusSignRed.svg'
import './style.css'

function ButtonChar(props){

  const [typeChar, setTypeChar] = useState(props.typeChar)

  const [char, setChar] = useState(props.value)

  const [className, setClassName] = useState(props.className)
  
  const [pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj] = useContext(ApiContextCharPoke)

  let copyCharObj = {...charObj}

  useEffect(()=>{
    setChar(0)
  },[resetChar])

  function moreChar(){

    if (total > 0 && char < 5) {
      setChar((prevState)=> prevState + 1)
      setTotal( (prevState)=> prevState - 1)

      switch (typeChar) {
        case 'Habilidade':
          copyCharObj.ability = char + 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Armadura':
          copyCharObj.armor = char + 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Força':
          copyCharObj.strength = char + 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Resistência':
          copyCharObj.resistence = char + 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Poder de fogo':
          copyCharObj.firePower = char + 1
          setCharObj({...charObj, ...copyCharObj})
          break;
      
        default:
          break;
      }

      if ( typeChar == 'Resistência') {
        setManaLife((prevState)=> prevState + 5)
      }
    }
  }

  function lessChar(){

    if (total < 12 && char >= 1) {
      setChar((prevState)=> prevState - 1)
      setTotal((prevState)=> prevState + 1)

      switch (typeChar) {
        case 'Habilidade':
          copyCharObj.ability = char - 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Armadura':
          copyCharObj.armor = char - 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Força':
          copyCharObj.strength = char - 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Resistência':
          copyCharObj.resistence = char - 1
          setCharObj({...charObj, ...copyCharObj})
          break;
        case 'Poder de fogo':
          copyCharObj.firePower = char - 1
          setCharObj({...charObj, ...copyCharObj})
          break;
      
        default:
          break;
      }

      if ( typeChar == 'Resistência') {
        setManaLife((prevState)=> prevState - 5)
      }
    }
    
  }
    return(
      <div className={className}>
        <h1 className="typeChar">{typeChar}</h1>
        <div className="containerButtonChar">
          <img onClick={lessChar} className="minusSign" src={minusSign} alt="" />
          <div className="numberChar">{char}</div>
          <img onClick={moreChar} className="plusSign" src={plusSign} alt="" />
        </div>
      </div>
    )
}

export default ButtonChar