import { useContext} from 'react'
import './style.css'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';

function CharDetails() {

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg, currentAtributes, setCurrentAtribute] = useContext(ApiContextBattle)
  
  return (
    <div className="charDetails">
      <p>Nome : {currentName}</p>
      <p>Vida : {currentLife}</p>
      <p>Mana : {currentMana}</p>
      <p>Atributos<br /> F{currentAtributes.strength} - H{currentAtributes.ability} - A{currentAtributes.armor} - R{currentAtributes.resistence} - PDF{currentAtributes.firePower}</p>
    </div>
  )
}

export default CharDetails