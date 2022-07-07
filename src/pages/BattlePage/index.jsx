import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import BattleLog from '../../components/PokeBattlePage/BattleLog'
import CharDetails from '../../components/PokeBattlePage/CharDetails'
import DiceBattle from '../../components/PokeBattlePage/DiceBattle'
import ImgCharBattle from '../../components/PokeBattlePage/ImgCharBattle'
import SkillContainer from '../../components/PokeBattlePage/SkillsContainer'
import { ApiContextBattle, ApiProviderBattle} from '../../contexts/ApiContextBattle'
import './style.css'

function BattlePage() {

  const navigate = useNavigate()

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle] = useContext(ApiContextBattle)

  function backPerfil(){
    navigate('/profile')
  }
  
  return (               
      
      <div className="battleContainer">
        {isEndBattle == true ? (<><BattleLog className="battleLogEndBattle"></BattleLog> <button onClick={backPerfil}>Perfil</button></>) : (<><div className='topContainer'>
          <BattleLog></BattleLog>
          <CharDetails></CharDetails>
        </div>
        <div className='imgContainer imgContainerTop'>
          <div className='lifeBar'>{botCurrent.life}</div>
          <ImgCharBattle value="enemy"></ImgCharBattle>
          <div className='manaBar'>{botCurrent.mana}</div>
          </div>
          <DiceBattle></DiceBattle> 
        <div className='imgContainer imgContainerBot'>
          <div className='lifeBar'>{currentLife}</div>
          <ImgCharBattle value="player"></ImgCharBattle>
          <div className='manaBar'>{currentMana}</div>
          </div>
        <div className='footerContainer'>
          <SkillContainer></SkillContainer>      
          
        </div></>)}
        
        
      </div>
   
  )
}

export default BattlePage