import { useContext } from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'
import Skill from '../skill/Skill'
import './style.css'

function SkillContainer(){
  
  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge] = useContext(ApiContextBattle)

  

  return (
    <div className='skillContainer'>
      <Skill nameAction={"attack"}></Skill>
      <Skill nameAction={"rangedAttack"}></Skill>
      <Skill nameAction={"defend"}></Skill>
      <Skill nameAction={"dodge"}></Skill>
    </div>
  )
}

export default SkillContainer