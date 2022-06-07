import { useContext} from 'react'
import { ApiContextBattle } from '../../../contexts/ApiContextBattle'

import './style.css'

function ImgCharBattle(props) {

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action] = useContext(ApiContextBattle)

  console.log(botCurrent);

  if (props.value == "player") {
    return (
      <div className="imgCharBattle">
          <img className="imgCharBattle" src={currentImg} alt={props.value}/>
      </div>
    )
  }else {
    return (
      <div className="imgCharBattle">
          <img className="imgCharBattle" src={botCurrent.imgPoke} alt={props.value}/>
      </div>
    )
  }

  
}

export default ImgCharBattle