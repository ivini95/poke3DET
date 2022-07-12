import { useContext } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'

function QuitButton (){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle,quitBattle] = useContext(ApiContextBattle)
  return(
    <button className='quitButton' onClick={quitBattle}>Desistir</button>
  )
}

export default QuitButton