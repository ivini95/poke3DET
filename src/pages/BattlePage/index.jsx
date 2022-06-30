import { useContext } from 'react'
import BattleLog from '../../components/PokeBattlePage/BattleLog'
import CharDetails from '../../components/PokeBattlePage/CharDetails'
import DiceBattle from '../../components/PokeBattlePage/DiceBattle'
import EndBattle from '../../components/PokeBattlePage/EndBattle'
import ImgCharBattle from '../../components/PokeBattlePage/ImgCharBattle'
import SkillContainer from '../../components/PokeBattlePage/SkillsContainer'
import { ApiContextBattle, ApiProviderBattle} from '../../contexts/ApiContextBattle'
import './style.css'

function BattlePage() {

  return (
    <ApiProviderBattle>

      <div className="battleContainer">
        <EndBattle></EndBattle>
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