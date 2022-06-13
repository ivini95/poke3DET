import { useState, useContext, useEffect } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import './style.css';

function DiceBattle(){
  

  var cube = document.getElementById('cube');

  const [diceRolling, setDiceRolling] = useState(false)
  
  function rotateDice(randomNumber) {

    setDiceRolling(true)

    var xyRand = getDiceSide(randomNumber)

    
    cube.style.transform = 'rotateX('+xyRand[0]+'deg) rotateY('+xyRand[1]+'deg)';
    
    setTimeout(() => {
      setDiceRolling(false)
    }, 2100);
  }

  const randomNumberInicial = Math.floor(Math.random() * 6) + 1;

  const [compareRandomDeg, setCompareRandomDeg] = useState(randomNumberInicial)

function getDiceSide(randomNumber){

  console.log(compareRandomDeg);

  var min = 1;
  var max = 6;

  const randomDeg = Math.floor(Math.random() * ((max-min) + min))
  if (randomDeg == compareRandomDeg) {
    setCompareRandomDeg(randomDeg + 1)
  }else {
    setCompareRandomDeg(randomDeg)
  }
  
  let multipleDeg = compareRandomDeg * 360

  const deg = [0,0]


  switch (randomNumber) {
    case 1:
        deg[0] = 0 + multipleDeg
        deg[1] = 0 + multipleDeg
      
      break;
      case 2:
        deg[0] = 0 + multipleDeg
        deg[1] = 180 + multipleDeg
       
      break;
      case 3:
        deg[0] = 180 + multipleDeg
        deg[1] = 90 + multipleDeg
        
      break;
      case 4:
        deg[0] = 180 + multipleDeg
        deg[1] = 270 + multipleDeg
      break;
      case 5:
        deg[0] = 270 + multipleDeg
        deg[1] = 360 + multipleDeg
      break;
      case 6:
        deg[0] = 90 + multipleDeg
        deg[1] = 90 + multipleDeg
      break;
  
    default:
      break;
  }

  return deg
} 

  const [diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn] = useContext(ApiContextBattle)

  let historicTempCopy = {...historicTemp};

  const[turn, setTurn] = useState(0)

  function generateValue() {
    if (diceRolling == false) {
      if (currentAction != "") {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        rotateDice(randomNumber)
        setDiceValue(randomNumber)
        setTimeout(() => {
          historicTempCopy.id ++
          historicTempCopy.diceValue = randomNumber
          setHistoricTemp({...historicTemp,...historicTempCopy})
          setTurn(historicTempCopy.id);
        }, 2010);
        
      }
    }
  }

  useEffect(()=> {
    if (turn > 0) {
      action()
    }
  },[turn])

  return (
    
    <section className="container">
      <div id="cube" className='swing' onClick={generateValue}>
        <div className="front">
          <span className="dot dot1"></span>
        </div>
        <div className="back">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
        </div>
        <div className="right">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
        </div>
        <div className="left">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
        </div>
        <div className="top">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
          <span className="dot dot5"></span>
        </div>
        <div className="bottom">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>  
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
          <span className="dot dot5"></span>
          <span className="dot dot6"></span>
        </div>
      </div>
    </section>

  )
}

export default DiceBattle