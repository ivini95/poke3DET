import { useContext } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import './style.css'

function SkillContainer(){
  
  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, generateBot] = useContext(ApiContextBattle)

  

  return (
    <div className='skillContainer'>
      <button onClick={generateBot}>BOT</button>
      <button onClick={attack}>Ataque Corpo A Corpo</button>
      <button onClick={rangedAttack}>Ataque Distancia</button>
      <button onClick={defend}>Defesa</button>
      <button onClick={dodge}>Esquiva</button>
    </div>
  )
}

export default SkillContainer