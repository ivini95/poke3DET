import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeIcon from '../../components/AllComponentes/ThemeIcon'
import BattleLog from '../../components/PokeBattlePage/BattleLog'
import CharDetails from '../../components/PokeBattlePage/CharDetails'
import DiceBattle from '../../components/PokeBattlePage/DiceBattle'
import FaseBatleDisplay from '../../components/PokeBattlePage/FaseBatleDisplay'
import ImgCharBattle from '../../components/PokeBattlePage/ImgCharBattle'
import SkillContainer from '../../components/PokeBattlePage/SkillsContainer'
import TurnDisplay from '../../components/PokeBattlePage/TurnDisplay'
import { ApiContextBattle, ApiProviderBattle} from '../../contexts/ApiContextBattle'
import './style.css'

function BattlePage() {

  const navigate = useNavigate()

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle] = useContext(ApiContextBattle)

  const lifeBarBot = document.getElementById('lifeBarBot')
  const lifeBarPlayer = document.getElementById('lifeBarPlayer')
  const tamanhoBarra = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--progress')


  useEffect(()=>{
    if (lifeBarBot) {
      let lifeBot = botCurrent.life
      let lifeTotalBot = botCurrent.characteristics.resistence * 5
      lifeBarBot.style.setProperty('--progress', (lifeBot * tamanhoBarra) / lifeTotalBot)
    }
    
  },[botCurrent.life])

  useEffect(()=>{
    if (lifeBarPlayer) {
        let lifePlayer = currentLife
        let lifeTotalPlayer = currentAtributes.resistence * 5
        lifeBarPlayer.style.setProperty('--progress', (lifePlayer * tamanhoBarra) / lifeTotalPlayer)
    }
    
  },[currentLife])

  function backPerfil(){
    navigate('/profile')
  }

  
  return (               
      
      <div className="battleContainer">
        <div className='themeIconBattle'><ThemeIcon/></div>
        
        {isEndBattle == true ? (<><div className='containerEndBattleLog'><BattleLog/></div> <button className='profileButton' onClick={backPerfil}>Perfil</button></>) : (<><div className='topContainer'>
        <div className='containerBattleLog'>
          <BattleLog/>
        </div>
          <CharDetails></CharDetails>
        </div>
        <div className='imgContainer imgContainerTop'>
          <div className='lifeBar'>
          <div id='lifeBarBot'></div>
          <div className='lifeNumberBar'>{botCurrent.life}</div>
          </div>
          <ImgCharBattle value="enemy"></ImgCharBattle>
          <div className='manaBar'>{botCurrent.mana}</div>
          </div>
        <div className='middleContainer'>
          <TurnDisplay/>
          <DiceBattle/>
          <FaseBatleDisplay/>
        </div>  
        <div className='imgContainer imgContainerBot'>
          <div  className='lifeBar'>
          <div id='lifeBarPlayer'></div>
          <div className='lifeNumberBar'>{currentLife}</div>
          </div>
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