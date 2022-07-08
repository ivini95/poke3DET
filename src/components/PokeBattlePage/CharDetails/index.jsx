import { useContext} from 'react'
import './style.css'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';

function CharDetails() {

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected] = useContext(ApiContextBattle)

  if (pokeStatusSelected == "" || pokeStatusSelected == "player") {
    return (
      <div className="charDetails">
        <p>{currentName}</p>
        <p>Vida {currentLife}</p>
        <p>Mana {currentMana}</p>
        <div>
        <p>F {currentAtributes.strength}</p>
        <p>H {currentAtributes.ability}</p>   
        <p>A {currentAtributes.armor}</p>
        <p>R {currentAtributes.resistence}</p>
        <p>PDF {currentAtributes.firePower}</p>
        </div>
      </div>
    )
  }else if(pokeStatusSelected == "enemy") {
    return (
      <div className="charDetails">
        <p>{botCurrent.name}</p>
        <p>Vida {botCurrent.life}</p>
        <p>Mana {botCurrent.mana}</p>
        <div>
        <p>F {botCurrent.characteristics.strength}</p>
        <p>H {botCurrent.characteristics.ability}</p>
        <p>A {botCurrent.characteristics.armor}</p>
        <p>R {botCurrent.characteristics.resistence}</p>
        <p>PDF {botCurrent.characteristics.firePower}</p>
        </div>
      </div>
    )
  }
}

export default CharDetails