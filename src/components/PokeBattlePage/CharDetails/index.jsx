import { useContext} from 'react'
import './style.css'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';

function CharDetails() {

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected, botLife] = useContext(ApiContextBattle)

  if (pokeStatusSelected == "" || pokeStatusSelected == "player") {
    return (
      <div className="charDetails">
        <p>Nome : {currentName}</p>
        <p>Vida : {currentLife}</p>
        <p>Mana : {currentMana}</p>
        <p>Atributos<br /> F{currentAtributes.strength} - H{currentAtributes.ability} - A{currentAtributes.armor} - R{currentAtributes.resistence} - PDF{currentAtributes.firePower}</p>
      </div>
    )
  }else if(pokeStatusSelected == "enemy") {
    return (
      <div className="charDetails">
        <p>Nome : {botCurrent.name}</p>
        <p>Vida : {botLife}</p>
        <p>Mana : {botCurrent.mana}</p>
        <p>Atributos<br /> F{botCurrent.characteristics.strength} - H{botCurrent.characteristics.ability} - A{botCurrent.characteristics.armor} - R{botCurrent.characteristics.resistence} - PDF{botCurrent.characteristics.firePower}</p>
      </div>
    )
  }
}

export default CharDetails