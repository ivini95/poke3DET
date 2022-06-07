import Skill from '../skill/Skill'
import './style.css'

function SkillContainer(){
  
  return (
    <div className='skillContainer'>
      <Skill nameAction={"attack"}/>
      <Skill nameAction={"rangedAttack"}/>
      <Skill nameAction={"defend"}/>
      <Skill nameAction={"dodge"}/>
    </div>
  )
}

export default SkillContainer