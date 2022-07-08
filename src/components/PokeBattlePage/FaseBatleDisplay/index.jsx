import { useContext, useEffect } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'

function FaseBatleDisplay(){

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle] = useContext(ApiContextBattle)


  useEffect(()=>{
    const initiativeDisplay = document.getElementById('initiativeDisplay')
    if (currentAction && currentAction != undefined) {
      if (currentAction == 'initiative') {
        initiativeDisplay.style.border = "2px solid #9EF01A"
      }
    }

},[currentAction])

  useEffect(()=>{
    const timeDisplay = document.getElementById('timeDisplay')
    const attackDisplay = document.getElementById('attackDisplay')
    const defenseDisplay = document.getElementById('defenseDisplay')
    const damageDisplay = document.getElementById('damageDisplay')

    if (charTurn && charTurn != undefined) {
      console.log(charTurn);
      if(charTurn[1] == 'attack' && isTurnDamage == false){
        attackDisplay.style.border = "2px solid #9EF01A"
        defenseDisplay.style.border = ""
        initiativeDisplay.style.border = ""
      }else if(charTurn[1] == 'defense'){
        attackDisplay.style.border = ""
        defenseDisplay.style.border = "2px solid #9EF01A"
        initiativeDisplay.style.border = ""
      }
    }

    
  },[charTurn])

  useEffect(()=>{
    if(isTurnDamage == true){
      if (charTurn[0] == "bot") {
        setTimeout(() => {
          damageDisplay.style.border = "2px solid #9EF01A"
        attackDisplay.style.border = ""
        defenseDisplay.style.border = ""
        initiativeDisplay.style.border = ""
        }, 2000);
      }else{
        damageDisplay.style.border = "2px solid #9EF01A"
        attackDisplay.style.border = ""
        defenseDisplay.style.border = ""
        initiativeDisplay.style.border = ""
      }
      
    }else if(isTurnDamage == false){
      damageDisplay.style.border = ""
    }
  },[isTurnDamage])

  return (
    <div className='faseBattleDisplay'>
      <p id='timeDisplay'>TEMPO</p>
      <p id='initiativeDisplay'>INICIATIVA</p>
      <p id='attackDisplay'>ATAQUE</p>
      <p id='defenseDisplay'>DEFESA</p>
      <p id='damageDisplay'>DANO</p>
    </div>
  )

}

export default FaseBatleDisplay