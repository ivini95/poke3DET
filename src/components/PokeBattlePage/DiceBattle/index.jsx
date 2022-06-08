import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useState, useContext, useEffect } from 'react';
import { ApiContextBattle } from '../../../contexts/ApiContextBattle';
import { storageRef } from '../../../dataBase/firerebase';
import './style.css';

function DiceBattle(){

  var cube = document.getElementById('cube');

  var min = 1;
  var max = 12;

  function rotateDice(randomNumber) {
    var xRand = getRandom(max, min);
    var yRand = getRandom(max, min);
  
    cube.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';

    setTimeout(() => {
      var xyRand = getDiceSide(randomNumber)
    
      cube.style.transform = 'rotateX('+xyRand[0]+'deg) rotateY('+xyRand[1]+'deg)';
    }, 1000);
    
    
  }

function getRandom(max, min) {
  return (Math.floor(Math.random() * (max-min)) + min) * 90;
}

function getDiceSide(randomNumber){

  const deg = [0,0]

  switch (randomNumber) {
    case 1:
        deg[0] = 0
        deg[1] = 0
      break;
      case 2:
        deg[0] = 0
        deg[1] = 180
      break;
      case 3:
        deg[0] = 180
        deg[1] = 90
      break;
      case 4:
        deg[0] = 180
        deg[1] = 270
      break;
      case 5:
        deg[0] = 270
        deg[1] = 360
      break;
      case 6:
        deg[0] = 90
        deg[1] = 90
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
    if (currentAction != "") {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      rotateDice(randomNumber)
      setDiceValue(randomNumber)
      historicTempCopy.id ++
      historicTempCopy.diceValue = randomNumber
      setHistoricTemp({...historicTemp,...historicTempCopy})
      setTurn(historicTempCopy.id);
    }
  }

  useEffect(()=> {
    if (turn > 0) {
      action()
      
    }
  },[turn])

  return (
    
    <section className="container">
      <div id="cube" onClick={generateValue}>
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