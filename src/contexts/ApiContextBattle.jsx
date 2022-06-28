import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useState, createContext, useEffect } from "react";
import { db } from "../dataBase/firerebase";
import { UserAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom'

export const ApiContextBattle = createContext()

export function ApiProviderBattle(props){

  const navigate = useNavigate()
  const {user} = UserAuth()

  

  useEffect(async()=>{
    
    if (user.uid) {
      
      const botPokeRef = collection(db,"users", user.uid,"tempData")
      const botPokeSnap = await getDocs(botPokeRef)
      if (botPokeSnap.size < 1) {
        navigate('/profile')
      }
    }
  },[user])

  const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800'

  const [pokemons, setPokemons] = useState({})
  
  const [currentImg, setCurrentImg] = useState("")
  const [currentLife, setCurrentLife] = useState(0)
  const [currentMana, setCurrentMana] = useState(0)
  const [currentName, setCurrentName] = useState("")
  const [currentAtributes, setCurrentAtribute] = useState({})
  const [diceValue , setDiceValue] = useState(1)
  const [botCurrent, setBotCurrent] = useState({})
  const [pokeStatusSelected, setPokeStatusSelected] = useState("")
  const [historicTemp, setHistoricTemp] = useState({
    'id':0,
    'diceValue': diceValue,
    'text': '',
    'textLog': ''
  })

  let historicTempCopy = {...historicTemp};

  useEffect(()=>{//consome POKEAPI
    
    fetch(url).then(res=> res.json())
        .then(data=>setPokemons(data.results))
        
  },[])

  
  useEffect(async ()=> {//busca dados do pokemon do player no banco de dados
    if (user.uid) {
      const pokeStatusRef = doc(db, "users", user.uid, "tempData", "pokePlayerTemp")
      const pokeStatusRefSnap = await getDoc(pokeStatusRef)
      const poke = pokeStatusRefSnap.data()
      
        const pokeStatus = poke.poke
        setCurrentLife(pokeStatus.life)
        setCurrentMana(pokeStatus.mana)
        setCurrentName(pokeStatus.name)
        setCurrentImg(pokeStatus.img)
        setCurrentAtribute(pokeStatus.characteristics)
      
    }
    
  },[user])

  useEffect(async ()=>{//busca dados do pokemon do bot no banco de dados
    if (user.uid) {
    const botPokeRef = doc(db, "users", user.uid, "tempData", "pokeBot")
    const botPokeRefSnap = await getDoc(botPokeRef)
    const pokeBot = botPokeRefSnap.data()
    setBotCurrent(pokeBot)
    }
  },[user])


  //------------------Dice logic--------------------
  
  

  const[turn, setTurn] = useState(0)

  function generateValue() {
    
    if (isBotRollingDice == true) {//dado bot

      if (isTurnDamage == false) {
        if (diceRolling == false) {
          
            rotateDice(diceBotValue)
            
            setIsBotRollingDice(false)
            setTimeout(() => {
              historicTempCopy.id ++
              historicTempCopy.diceValue = diceBotValue
              //setHistoricTemp({...historicTemp,...historicTempCopy})
              //setTurn(historicTempCopy.id);
            }, 2010);
        }
      }else if(isTurnDamage == true){
        
          if (diceRolling == false) {
              rotateDice(diceBotValue)
              //damageFase(diceBotValue)
              setIsBotRollingDice(false)
              setTimeout(() => {
                historicTempCopy.id ++
                historicTempCopy.diceValue = diceBotValue
                //setHistoricTemp({...historicTemp,...historicTempCopy})
                //setTurn(historicTempCopy.id);
              }, 2010);
            }
    }
    }else {//dado player
      if (isTurnDamage == false) {
        if (diceRolling == false) {
          if (currentAction != "") {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            rotateDice(randomNumber)
            setDiceValue(randomNumber)
            if (currentAction != "defend") {
              logManager(randomNumber,currentName)
            }
            setTimeout(() => {
              historicTempCopy.id ++
              historicTempCopy.diceValue = randomNumber
              setHistoricTemp({...historicTemp,...historicTempCopy})
              setTurn(historicTempCopy.id);
            }, 2010)
          }
        }
      }else if(isTurnDamage == true){
        
        if (diceRolling == false) {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            rotateDice(randomNumber)
            setDiceValue(randomNumber)
            damageFase(randomNumber)
            setTimeout(() => {
              historicTempCopy.id ++
              historicTempCopy.diceValue = randomNumber
              setHistoricTemp({...historicTemp,...historicTempCopy})
              setTurn(historicTempCopy.id);
            }, 2010);
      }
    }
  }
    
  }

  useEffect(()=> {//quando o turn muda é chamada a função action, turn muda sempre que o dado gira
    if (turn > 0) {
      action()
    }
  },[turn])

  //--------------------------------------Dice Animation

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


  //--------------persistência de dados------------------

  const [currentAction, setCurrentAction] = useState("")
  const [charTurn, setCharTurn] = useState("")
  const [finalDamage, setFinalDamage] = useState()
  const [currentActionBot, setCurrentActionBot] = useState("")

  useEffect(async ()=>{//verifica se é o turno inicial e recupera
    
    if (user.uid) {
    
    const isInitiativeRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
    const isInitiativeSnap = await getDoc(isInitiativeRef)
    const isInitiative = isInitiativeSnap.data()
    if (isInitiative.initiative == true) {
      
      setCurrentAction("initiative")
      setCurrentActionBot("initiative")
    }
    }
  },[user])

  useEffect(async () => {//recupera dados temporarios de batalha após atualizar tela
    if (user.uid) {
      const turnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
      const turnSnap = await getDoc(turnRef)
      const turn = turnSnap.data()
      setCharTurn(turn.turn)
      if (turn.turnDamage) {
        setIsTurnDamage(turn.turnDamage)
      }
      if (turn.attackTypeTemp) {
        setAttackType(turn.attackTypeTemp)
      }

      if (turn.damage && turn.damage !=0) {
        setDamage(turn.damage)
      }
    }
    
  },[user]) 


  useEffect(async ()=>{ //atualiza vida do bot no bando de dados quando toma dano
    
    if (finalDamage != undefined) {
     
      if (charTurn[0] == "bot" && charTurn[1] == "attack") {
        
        if (finalDamage > 0) {
            
          if (user.uid) {
            const botPokeRef = doc(db, "users", user.uid, "tempData", "pokeBot")
            await updateDoc(botPokeRef, {
              life:botCurrent.life - finalDamage
            })
            
            const botPokeRefSnap = await getDoc(botPokeRef)
            const pokeBot = botPokeRefSnap.data()
            setBotCurrent(pokeBot)
            setLifeChange(true)
            
          }
          
        }
      } else {
        
          if (finalDamage > 0) {
            const PokeRefPlayer = doc(db, "users", user.uid, "tempData", "pokePlayerTemp")
            await updateDoc(PokeRefPlayer, {
              "poke.life": currentLife - finalDamage
              
              
            })
            setCurrentLife(currentLife - finalDamage)
            setLifeChange(true)
        }
      }
    }
  },[finalDamage])

  //--------------Battle actions--------------------------

  
  const [damage, setDamage] = useState(0)
  const [protection, setProtection] = useState(0)

  
  function action() {//chama a função de acordo com o botão selecionado
    
      switch (currentAction) {
        case "initiative":
          initiative()
          break;
        case "attack":
          attack()
          break;
        case "rangedAttack":
          rangedAttack()
          break;
        case "defend":
          defend()
          break;
        case "dodge":
          dodge()
          break;

        default:
          break;
      }
  }

  const[diceBotValue, setDiceBotValue] = useState(0)
  const [isBotRollingDice, setIsBotRollingDice] = useState(false)

  async function initiative(){

    let botDiceInitiative = Math.floor(Math.random() * (6 - 0) + 1)
    setDiceBotValue(botDiceInitiative)
    setTimeout(() => {
      setIsBotRollingDice(true)
    }, 1000);
    
    setTimeout(() => {
      if (botDiceInitiative > diceValue) {
        setCurrentActionBot("")
        setCurrentAction("")
        setCharTurn(["bot","attack"])
        console.log("bot primeiro");
  
      }else if(botDiceInitiative < diceValue) {
        setCurrentAction("")
        setCurrentActionBot("")
        setCharTurn(["player","attack"])
        console.log("player primeiro");
      }else {
        console.log("Empate");
      } 
    }, 2200);
    
    if (botDiceInitiative > diceValue) {

      await setDoc(doc(db, "users", user.uid,"tempData","tempBattleData"), {
        turn: ["bot","attack"]
      })

    }else if(botDiceInitiative < diceValue) {

      await setDoc(doc(db, "users", user.uid,"tempData","tempBattleData"), {
        turn: ["player","attack"]
      })
    }
  }

  useEffect(()=>{//verificar se é o bot que está jogando o dado
    if (isBotRollingDice == true) {
      generateValue()
      setIsBotRollingDice(false)
    }
  },[isBotRollingDice])

  useEffect(()=>{//verifica se é a vez do bot
    if (currentActionBot != "initiative") {
      if(charTurn[0] == "bot" && charTurn[1] == "attack" ){
        let skillRandom = Math.floor(Math.random() * (2 - 0) + 1)
        if (skillRandom == 1) {
          setCurrentActionBot("attack")
          attack()
          console.log("bot ataque");
        }else {
          setCurrentActionBot("rangedAttack")
          rangedAttack()
          console.log("bot ataque distancia");
        }
        
      }else if (charTurn[0] == "bot" && charTurn[1] == "defense" ){
        const abilityTest = botCurrent.characteristics.ability - currentAtributes.ability 
        if (dodged == false) {
          let skillRandom = Math.floor(Math.random() * (2 - 0) + 1)
          if(skillRandom == 2 && abilityTest >=1) {
            setCurrentActionBot("dodge")
            dodge()
            console.log("bot esquiva");
          }else  {
            setCurrentActionBot("defend")
            defend("defend")
            console.log("bot defend");
          }
        }else {
          defend()
        }
      }
    }
  },[charTurn])



  async function attack() {
    if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
      
      if (diceValue <= currentAtributes.ability ) {
        console.log('acertou');
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true,
                attackTypeTemp:"meleeAttack"
              })
        setIsTurnDamage(true)
        setAttackType("meleeAttack")
      }else{
        console.log("errou");
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["bot","attack"]
              })
          setCharTurn(["bot","attack"])
          setCurrentAction("")
      }
      
    }else if(charTurn[0] == "bot" && charTurn[1] == "attack") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      
      setDiceBotValue(diceBot)
      setTimeout(() => {
        logManager(diceBot,botCurrent.name,"attack")
        setIsBotRollingDice(true)
        console.log("bot jogou dado", isTurnDamage );
      }, 1000);

      
        if (diceBot <= botCurrent.characteristics.ability) {

          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true
              })
          setIsTurnDamage(true)
          setTimeout(() => {
          
          const diceBotDamage = Math.floor(Math.random() * (6 - 0) + 1)
            setTimeout(() => {
              damageFase(diceBotDamage,'meleeAttack')
              console.log("bot acertou", diceBot);
            }, 1000);
          }, 3100);
          
        }else {
          console.log("bot errou", diceBot);
          setTimeout(() => {
            setCharTurn(["player", "attack"])
            //setCurrentActionBot("")
          }, 3200);
              const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","attack"]
              })
        }
      
      
    }
  }

  async function rangedAttack() {
    if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
      if (diceValue <= currentAtributes.ability ) {
        console.log('acertou');
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true,
                attackTypeTemp:"rangerAttack"
              })
        setIsTurnDamage(true)
        setAttackType("rangerAttack")
      }else{
        console.log("errou");
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["bot","attack"]
              })
          setCharTurn(["bot","attack"])
          setCurrentAction("")
      }
      
    }else if(charTurn[0] == "bot" && charTurn[1] == "attack") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      setDiceBotValue(diceBot)
      setTimeout(() => {
        logManager(diceBot,botCurrent.name,"rangerAttack")
        setIsBotRollingDice(true)
        console.log("bot jogou dado", isTurnDamage );
      }, 1000);
      
        if (diceBot <= botCurrent.characteristics.ability) {
          
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true
              })
          setIsTurnDamage(true)
          setTimeout(() => {
            
            const diceBotDamage = Math.floor(Math.random() * (6 - 0) + 1)

            setTimeout(() => {
              damageFase(diceBotDamage,'rangerAttack')
              console.log("bot acertou", diceBot);
            }, 1000);
          }, 3100);
          
        }else {
          console.log("bot errou", diceBot);
            setTimeout(() => {
              setCharTurn(["player", "attack"])
              //setCurrentActionBot("")
              console.log("mudou currentAction para vazio");
            }, 3200);
            const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","attack"]
              })
        }
    }
  }

  async function defend(action) {

    console.log("bot defende", charTurn, protection);

    if (charTurn[0] == "player" && charTurn[1] == "defense" && protection == 0) {
      if (action == "miss") {
      if (diceValue == 6) {
        const currentProtection = (currentAtributes.armor * 2) + currentAtributes.ability 
        console.log("player defesa critica após esquiva",currentProtection);
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        logManager(currentProtection,currentName)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })   
      }else {
        const currentProtection = currentAtributes.armor + currentAtributes.ability
        console.log("player defesa após esquiva",currentProtection);
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        logManager(currentProtection,currentName)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })
      }
    }else{
      if (diceValue == 6) {
        const currentProtection = (diceValue + (currentAtributes.armor * 2) + currentAtributes.ability )
        console.log("player critico defende",currentProtection);
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        logManager(currentProtection,currentName)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })   
      }else {
        const currentProtection = (diceValue + currentAtributes.armor + currentAtributes.ability )
        console.log("player defende",currentProtection);
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        logManager(currentProtection,currentName)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })
      }
    }
    }else if(charTurn[0] == "bot") {

      console.log("ação atual ao chamar função defesa", currentActionBot);
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      setDiceBotValue(diceBot)
      setTimeout(() => {
        setIsBotRollingDice(true)
      }, 1000);

      setTimeout(() => {
        //VERIFICAR SE JÁ ESQUIVOU
        if (action == "miss") {
          if (diceBot == 6) {
            const currentProtection = diceBot + (botCurrent.characteristics.armor * 2)
            //setCurrentActionBot("")
            logManager(currentProtection,botCurrent.name,action)
            console.log("bot defesa critica após esquiva",currentProtection);
            setProtection(currentProtection)
            setDodged(false)
          }else {
            const currentProtection = diceBot + botCurrent.characteristics.armor
            //setCurrentActionBot("") 
            logManager(currentProtection,botCurrent.name,action)
            console.log("bot defesa após esquiva",currentProtection);
            setProtection(currentProtection)
            setDodged(false)
          }
          
        }else {
          if (diceBot == 6) {
            const currentProtection = diceBot + (botCurrent.characteristics.armor * 2) + botCurrent.characteristics.ability
            logManager(currentProtection,botCurrent.name,action)
            setProtection(currentProtection)
            console.log("bot defesa critica",currentProtection);
          }else {
            const currentProtection = diceBot + botCurrent.characteristics.armor + botCurrent.characteristics.ability
            logManager(currentProtection,botCurrent.name,action)
            setProtection(currentProtection)
            console.log("bot defesa",currentProtection);
          }
        }
        
      }, 3100);
      
    }
  }

  const [dodged, setDodged] = useState(false)
  const [possibleDodge, setPossibleDodge] = useState(true)

  useEffect(()=>{//verifica se bot pode esquivar
    if (user) {
      if (botCurrent.characteristics) {
        
        const abilityTest = currentAtributes.ability - botCurrent.characteristics.ability
        if (abilityTest < 1) {
          setPossibleDodge(true)
        } else {
          setPossibleDodge(false)
        }
      }
    }
  },[botCurrent])

  async function dodge() {
    if (dodged == false) {
      if (charTurn[0] == "player" && charTurn[1] == "defense") {

        const abilityTest = currentAtributes.ability - botCurrent.characteristics.ability
        
        if (diceValue <= abilityTest){
          setCurrentAction("")
          setProtection(damage)
          
          setCharTurn(["player","attack"])
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","attack"]
              })
          console.log("esquivou", damage);
        } else {
          setDodged(true)
          defend("miss")
          console.log("não esquivou");
        }
      
      } else if(charTurn[0] == "bot" && charTurn[1] == "defense"){

 
        const abilityTest = botCurrent.characteristics.ability - currentAtributes.ability 

        if (abilityTest < 1) {
          console.log("impossivel esquivar");
          defend()
        } else {

          const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
          setDiceBotValue(diceBot)
          setTimeout(() => {
            setIsBotRollingDice(true)
          }, 1000);
          
          if (diceBot <= abilityTest){
            setTimeout(() => {
              setProtection(damage)
            }, 3100);
              
              const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
                  await updateDoc(battleTurnRef, {
                    turn: ["bot","attack"]
                  })
              console.log("bot esquivou", damage);
              //setCurrentActionBot("")
            } else {
              setDodged(true)
              console.log("bot não esquivou");
              defend("miss")
          }
        } 
      }
    }
  }

//--------------------calc actions-----------------------

  const [isTurnDamage, setIsTurnDamage] = useState(false)
  const [attackType, setAttackType] = useState('')

  async function damageFase(randomNumber, BotAttackType){


    if (attackType == "meleeAttack" || BotAttackType == "meleeAttack") {
      if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
        if (randomNumber == 6) {
          const currentDamage = (randomNumber + (currentAtributes.strength * 2) + currentAtributes.ability )
          logManager(currentDamage,currentName)
          setIsTurnDamage(false)
          setTimeout(() => {
            setCharTurn(["bot","defense"])
            setCurrentAction("")
            
          }, 2100);
          
          setDamage(currentDamage)
          console.log("player ataque critico ", currentDamage);
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["bot","defense"],
                turnDamage: false,
                damage:currentDamage
              })
          
        }else {
          const currentDamage = (randomNumber + currentAtributes.strength + currentAtributes.ability )
          logManager(currentDamage,currentName)
          setIsTurnDamage(false)
          setTimeout(() => {
            setCharTurn(["bot","defense"])
            setCurrentAction("")
            
          }, 2100);
          setDamage(currentDamage)
          console.log("player ataque", currentDamage);
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
          
              await updateDoc(battleTurnRef, {
                turn: ["bot","defense"],
                turnDamage: false,
                damage:currentDamage
              })
        }
      }else if(charTurn[0] == "bot" && charTurn[1] == "attack") {
        
        setTimeout(() => {
          setDiceBotValue(randomNumber)
          setIsBotRollingDice(true)
        }, 1000);


      if (randomNumber == 6) {
        const currentDamage = (randomNumber + (botCurrent.characteristics.strength * 2) + botCurrent.characteristics.ability)
        
          setTimeout(() => {
            logManager(currentDamage,botCurrent.name,true)
          }, 1100);

          setTimeout(() => {
            
            console.log(charTurn, currentDamage);
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
            //setCurrentActionBot("")
            setIsTurnDamage(false)
          }, 3100);
          
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","defense"],
                turnDamage: false,
                damage:currentDamage
              })
          
        }else {
          const currentDamage = (randomNumber + botCurrent.characteristics.strength + botCurrent.characteristics.ability)

          setTimeout(() => {
            logManager(currentDamage,botCurrent.name,true)
          }, 1100);
          
          setTimeout(() => {
            
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
            //setCurrentActionBot("")
            setIsTurnDamage(false)
          }, 3100);
          
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","defense"],
                turnDamage: false,
                damage:currentDamage
              })
        }
      }
    }else if (attackType == "rangerAttack" || BotAttackType == "rangerAttack") {
      if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
        if (randomNumber == 6) {
          const currentDamage = (randomNumber + (currentAtributes.firePower * 2) + currentAtributes.ability )
          logManager(currentDamage,currentName)
          setIsTurnDamage(false)
          setTimeout(() => {
            setCharTurn(["bot","defense"])
            setCurrentAction("")
            
          }, 2100);
          setDamage(currentDamage)
          console.log("player ataque a distancia critico", currentDamage);
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["bot","defense"],
                turnDamage: false,
                damage:currentDamage
              })
          
        }else {
          const currentDamage = (randomNumber + currentAtributes.firePower + currentAtributes.ability )
          logManager(currentDamage,currentName)
          setIsTurnDamage(false)
          setTimeout(() => {
            setCharTurn(["bot","defense"])
            setCurrentAction("")
            
          }, 2100);
          setDamage(currentDamage)
          console.log("player ataque a distancia", currentDamage);
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
          
              await updateDoc(battleTurnRef, {
                turn: ["bot","defense"],
                turnDamage: false,
                damage:currentDamage
              })
          
          
        }
      }else if(charTurn[0] == "bot" && charTurn[1] == "attack") {

        
        setTimeout(() => {
          setDiceBotValue(randomNumber)
          setIsBotRollingDice(true)
        }, 1000);


      if (randomNumber == 6) {
          const currentDamage = (randomNumber + (botCurrent.characteristics.firePower * 2) + botCurrent.characteristics.ability)

          setTimeout(() => {
            logManager(currentDamage,botCurrent.name,true)
          }, 1100);
          
          setTimeout(() => {
            console.log(charTurn, currentDamage);
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
            //setCurrentActionBot("")
            setIsTurnDamage(false)
          }, 3100);
          
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","defense"],
                turnDamage: false,
                damage:currentDamage
              })
          
        }else {
          const currentDamage = (randomNumber + botCurrent.characteristics.firePower + botCurrent.characteristics.ability)

          setTimeout(() => {
            logManager(currentDamage,botCurrent.name,true)
          }, 1100);
          
          setTimeout(() => {
            console.log(charTurn, currentDamage);
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
            //setCurrentActionBot("")
            setIsTurnDamage(false)
          }, 3100);
          
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","defense"],
                turnDamage: false,
                damage:currentDamage
              })
        }
      }
    }
    
  }


  useEffect(async ()=>{

    if (protection != 0 && charTurn[0] == "bot" && charTurn[1] == "defense") {//função chamada após bot defender
      calcDamage()
      setCharTurn(["bot", "attack"])
      const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","attack"]
            })
    }else if(protection != 0){//função chamada após player defender
      calcDamage()
    }
    
  },[protection])

  const [lifeChange, setLifeChange] = useState(false)
  

  async function calcDamage() {

    const currentFinalDamage = damage - protection
    if (currentFinalDamage <= 0) {
      
      setFinalDamage(0)
      setDamage(0)
      setProtection(0)

      const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                damage: 0
              })

    }else {
      
      setFinalDamage(currentFinalDamage)
      setDamage(0)
      setProtection(0)

      const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                damage: 0
              })
      
    }

  }

  useEffect(()=> {//sempre que tomar dano
    if (lifeChange == true) {
        endBattle()
    }
  },[lifeChange])

  async function endBattle() {
    if (botCurrent.life <= 0) {
      console.log("fim, player vence");
      //acesso bot no banco de dados e apago o bot
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokeBot"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","tempBattleData"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokePlayerTemp"))
      //redireciono para tela profile
      navigate('/profile')
    }else if (currentLife <= 0){
      console.log("fim, bot vence");
      //acesso bot no banco de dados e apago o bot
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokeBot"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","tempBattleData"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokePlayerTemp"))
      //redireciono para tela profile
      navigate('/profile')
    }else{
      setLifeChange(false)
    }
  }


  //--------------log controller---------

  function logManager(valueTurn,nameTurn,action) {

    console.log("FUNÇÃO LOG MANAGER CHAMADA", charTurn, "turno de dano:", isTurnDamage, "ação atual:", action);

    if (isTurnDamage == false) {

      if (currentAction == "initiative") {
        logInitiative(valueTurn,nameTurn)
      }else if(charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
        if (currentAction == "rangedAttack") {
          logAttackRanged(valueTurn,nameTurn)
        }else if(currentAction == "attack"){
          logAttackMelee(valueTurn,nameTurn)
        }
      } else if(charTurn[0] == "player" && charTurn[1] == "defense"){
        if (currentAction == "dodge") {
          logDodge(valueTurn,nameTurn)
        }else if(currentAction == "defend"){
          logDefend(valueTurn,nameTurn)
        }
      }else if(charTurn[0] == "bot" && charTurn[1] == "attack" ) {

        if (action == "rangerAttack") {
          logAttackRanged(valueTurn,nameTurn)
        }else if(action == "attack"){
          logAttackMelee(valueTurn,nameTurn)
        }
      } else if(charTurn[0] == "bot" && charTurn[1] == "defense"){

        if (action == "dodge") {
          console.log("log esquiva");
          logDodge(valueTurn,nameTurn)
        }else if(action == "defend"){
          console.log("log defesa");
          logDefend(valueTurn,nameTurn)
        }
      }

    }else if(isTurnDamage == true){

      if(charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
        
        logAttackDamage(valueTurn,nameTurn)
        
      }else if(charTurn[0] == "bot" && charTurn[1] == "attack" && damage == 0){
        logAttackDamage(valueTurn,nameTurn)
      }
    }
    if (action == true) {
      logAttackDamage(valueTurn,nameTurn)
    }
   
  }

 

  function logInitiative(valueTurn,nameTurn) {
    historicTempCopy.text = `${nameTurn} Joga iniciativa `
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    setTimeout(() => {
      historicTempCopy.text = `- ${valueTurn}\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    }, 2010)
  }
  

  function logAttackMelee(valueTurn,nameTurn){
    
      historicTempCopy.text = `${nameTurn} Realiza Ataque Corpo a Corpo `
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
      setTimeout(() => {
        historicTempCopy.text = `- ${valueTurn}\n`
        historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
        setHistoricTemp({...historicTemp,...historicTempCopy})
      }, 2010)
  }

  function logAttackRanged(valueTurn,nameTurn){
    
    historicTempCopy.text = `${nameTurn} Realiza Ataque a Distancia `
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
    setTimeout(() => {
      historicTempCopy.text = `- ${valueTurn}\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    }, 2010)
}

function logDefend(valueTurn,nameTurn){
    
  historicTempCopy.text = `${nameTurn} Defende `
  historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
  setHistoricTemp({...historicTemp,...historicTempCopy})
    historicTempCopy.text = `- ${valueTurn}\n`
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
  
}

function logDodge(valueTurn,nameTurn){
    
  historicTempCopy.text = `${nameTurn} Tenta esquivar `
  historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
  setHistoricTemp({...historicTemp,...historicTempCopy})
  setTimeout(() => {
    historicTempCopy.text = `- ${valueTurn}\n`
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
  }, 2010)
}

function logAttackDamage(valueTurn,nameTurn){

  setTimeout(() => {
    historicTempCopy.text = `${nameTurn} Joga ${valueTurn} no dado de ataque\n`
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
  }, 2010)
}


 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}