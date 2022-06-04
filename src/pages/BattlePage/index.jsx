import { useEffect } from 'react'
import BattleLog from '../../components/PokeBattlePage/BattleLog'
import CharDetails from '../../components/PokeBattlePage/CharDetails'
import DiceBattle from '../../components/PokeBattlePage/DiceBattle'
import ImgCharBattle from '../../components/PokeBattlePage/ImgCharBattle'
import SkillContainer from '../../components/PokeBattlePage/SkillsContainer'
import { ApiProviderBattle } from '../../contexts/ApiContextBattle'
import './style.css'

function BattlePage() {

  return (
    <ApiProviderBattle>
      <div className="battleContainer">
        <div className='topContainer'>
          <BattleLog></BattleLog>
          <CharDetails></CharDetails>
        </div>
        <div className='imgContainer imgContainerTop'><ImgCharBattle value="enemy"></ImgCharBattle></div>
        <div className='imgContainer imgContainerBot'><ImgCharBattle value="player"></ImgCharBattle></div>
        <div className='footerContainer'>
          <SkillContainer></SkillContainer>
          <DiceBattle></DiceBattle>
        </div>
      </div>
    </ApiProviderBattle>
  )
}

export default BattlePage























/* import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

function BattleBot(){

  let navigate = useNavigate()
  let location = useLocation()
  let params = useParams()

  function back(){
    navigate("/")
  }

  useEffect(()=>{
    console.log(navigate);
    console.log(params);
    console.log(location);
  })

  return(
    <div>
      <div>teste{params.battleId}</div>
      <button onClick={back}>back</button>
    </div>
  )
}

export default BattleBot

 */