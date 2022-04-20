import BattleLog from '../../components/PokeBattlePage/BattleLog'
import CharDetails from '../../components/PokeBattlePage/CharDetails'
import DiceBattle from '../../components/PokeBattlePage/DiceBattle'
import ImgCharBattle from '../../components/PokeBattlePage/ImgCharBattle'
import SkillContainer from '../../components/PokeBattlePage/SkillsContainer'
import './style.css'

function BattlePage() {
  return (
    <div className="battleContainer">
      <ImgCharBattle></ImgCharBattle>
      <DiceBattle></DiceBattle>
      <SkillContainer></SkillContainer>
      <BattleLog></BattleLog>
      <CharDetails></CharDetails>
    </div>
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