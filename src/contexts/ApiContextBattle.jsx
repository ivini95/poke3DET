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
        setCurrentLife(poke.life)
        setCurrentMana(poke.mana)
        setCurrentName(poke.name)
        setCurrentImg(poke.imgPoke)
        setCurrentAtribute(poke.characteristics)
      
    }
    
  },[user])

  useEffect(()=>{

  })

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
        }
      }else if(isTurnDamage == true){        
          if (diceRolling == false) {
              rotateDice(diceBotValue)
              setIsBotRollingDice(false)
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


  useEffect(async ()=>{ 
    
    if (finalDamage != undefined) {
     
      if (charTurn[0] == "bot" && charTurn[1] == "attack") {//atualiza vida do bot no bando de dados quando toma dano
        
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
      } else {//atualiza vida do player no bando de dados quando toma dano
        
          if (finalDamage > 0) {
            
            const PokeRefPlayer = doc(db, "users", user.uid, "tempData", "pokePlayerTemp")
            await updateDoc(PokeRefPlayer, {
              "life": currentLife - finalDamage
            })
            setCurrentLife(currentLife - finalDamage)
            setLifeChange(true)
        }
      }
    }
  },[finalDamage])

  //--------------persistencia de dados local storage-----------
  

  useEffect(()=>{//salva log atual no localStorage
    console.log(isEndBattle);
    if (historicTemp.id > 0 && isEndBattle == false) {
      console.log("novo log");
      localStorage.setItem("historicTempData",JSON.stringify(historicTemp))
    }
    
  },[historicTemp])

  useEffect(()=>{//recupera dados do local storage

    const logStorage = JSON.parse(localStorage.getItem("historicTempData"))
      if (logStorage != null) {
        setHistoricTemp(logStorage)
      }
    
  },[user]) 
  

  //--------------Battle actions--------------------------

  
  const [damage, setDamage] = useState(0)
  const [protection, setProtection] = useState(0)


  
  function action() {//chama a função de acordo com o botão selecionado
    
      switch (currentAction) {
        case "initiative":
          if (currentAction == "initiative") {
            initiative()
            break;
          }
          
        case "attack":
          if (charTurn[0] == "player" && charTurn[1] == "attack") {
            attack()
            break;
          }
          
        case "rangedAttack":
          if (charTurn[0] == "player" && charTurn[1] == "attack") {
            rangedAttack()
            break;
          }
        case "defend":
          if (charTurn[0] == "player" && charTurn[1] == "defense") {
            defend()
            break;
          }
          
        case "dodge":
          if (possibleDodge == false) {
            dodge()
            break;
          }
        
        default:
          break;
      }
  }

  const[diceBotValue, setDiceBotValue] = useState(0)
  const [isBotRollingDice, setIsBotRollingDice] = useState(false)

  const [isDraw, setIsDraw] = useState(false)

  async function initiative(){

    let botDiceInitiative = Math.floor(Math.random() * (6 - 0) + 1)
    setDiceBotValue(botDiceInitiative)
    setTimeout(() => {
      logManager(botDiceInitiative,botCurrent.name,"initiative")
      if (botDiceInitiative == diceValue) {
        logManager(botDiceInitiative,botCurrent.name,"draw")
      } 

      setIsBotRollingDice(true)
    }, 1000);

    
    setTimeout(() => {
      if (botDiceInitiative > diceValue) {
        setIsDraw(false)
        setCurrentActionBot("")
        setCurrentAction("")
        setCharTurn(["bot","attack"])

  
      }else if(botDiceInitiative < diceValue) {
        setIsDraw(false)
        setCurrentAction("")
        setCurrentActionBot("")
        setCharTurn(["player","attack"])

      }
    }, 3100);
    
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
        }else {
          setCurrentActionBot("rangedAttack")
          rangedAttack()
        }
        
      }else if (charTurn[0] == "bot" && charTurn[1] == "defense" ){
        const abilityTest = botCurrent.characteristics.ability - currentAtributes.ability
        if (dodged == false) {
          let skillRandom = Math.floor(Math.random() * (2 - 0) + 1)
          if(skillRandom == 2 && abilityTest > 0) {
            setCurrentActionBot("dodge")
            dodge()
          }else  {
            setCurrentActionBot("defend")
            defend("defend")
          }
        }else {
          defend()
        }
      }
    }
  },[charTurn])

  async function attack() {
    if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
      
      if (diceValue <= currentAtributes.ability && diceValue != 6) {
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true,
                attackTypeTemp:"meleeAttack"
              })
        setIsTurnDamage(true)
        setAttackType("meleeAttack")
      }else{
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
      }, 1000);

      
        if (diceBot <= botCurrent.characteristics.ability && diceBot != 6) {

          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true
              })
          setIsTurnDamage(true)
          setTimeout(() => {
          
          const diceBotDamage = Math.floor(Math.random() * (6 - 0) + 1)
            setTimeout(() => {
              damageFase(diceBotDamage,'meleeAttack')
            }, 1000);
          }, 3100);
          
        }else {
          setTimeout(() => {
            setCharTurn(["player", "attack"])
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
      if (diceValue <= currentAtributes.ability && diceValue != 6) {
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true,
                attackTypeTemp:"rangerAttack"
              })
        setIsTurnDamage(true)
        setAttackType("rangerAttack")
      }else{
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
      }, 1000);
      
        if (diceBot <= botCurrent.characteristics.ability && diceBot != 6) {
          
          const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turnDamage: true
              })
          setIsTurnDamage(true)
          setTimeout(() => {
            
            const diceBotDamage = Math.floor(Math.random() * (6 - 0) + 1)

            setTimeout(() => {
              damageFase(diceBotDamage,'rangerAttack')
            }, 1000);
          }, 3100);
          
        }else {
            setTimeout(() => {
              setCharTurn(["player", "attack"])
            }, 3200);
            const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                turn: ["player","attack"]
              })
        }
    }
  }

  async function defend(action) {

    if (charTurn[0] == "player" && charTurn[1] == "defense" && protection == 0) {
      if (action == "miss") {
      
        const currentProtection = currentAtributes.armor + currentAtributes.ability
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        logManager(currentProtection,currentName,true)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })
      
    }else{
      if (diceValue == 6) {
        const currentProtection = (diceValue + (currentAtributes.armor * 2) + currentAtributes.ability )

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


      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      setDiceBotValue(diceBot)
      setTimeout(() => {
        setIsBotRollingDice(true)
      }, 1000);

      setTimeout(() => {
        if (action == "miss") {
          
            const currentProtection = botCurrent.characteristics.armor + botCurrent.characteristics.ability
            logManager(currentProtection,botCurrent.name,action)
            setProtection(currentProtection)
            setDodged(false)
    
        }else {
          if (diceBot == 6) {
            const currentProtection = diceBot + (botCurrent.characteristics.armor * 2) + botCurrent.characteristics.ability
            logManager(currentProtection,botCurrent.name,action)
            setProtection(currentProtection)
          }else {
            const currentProtection = diceBot + botCurrent.characteristics.armor + botCurrent.characteristics.ability
            logManager(currentProtection,botCurrent.name,action)
            setProtection(currentProtection)
          }
        }
        
      }, 3100);
      
    }
  }

  const [dodged, setDodged] = useState(false)
  const [possibleDodge, setPossibleDodge] = useState(true)

  useEffect(()=>{//verifica se player pode esquivar
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
        } else {
          setCurrentAction("")
          setDodged(true)
          defend("miss")
        }
      
      } else if(charTurn[0] == "bot" && charTurn[1] == "defense"){

 
        const abilityTest = botCurrent.characteristics.ability - currentAtributes.ability 

        if (abilityTest < 1) {
          defend()
        } else {

          const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
          setDiceBotValue(diceBot)
          setTimeout(() => {
            setIsBotRollingDice(true)
            logManager(diceBot,botCurrent.name,"dodge")
          }, 1000);
          
          if (diceBot <= abilityTest){
            setTimeout(() => {
              setProtection(damage)
            }, 3100);
              
              const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
                  await updateDoc(battleTurnRef, {
                    turn: ["bot","attack"]
                  })
              //setCurrentActionBot("")
            } else {
              setDodged(true)
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
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
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
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
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
            setDamage(currentDamage)
            setCharTurn(["player", "defense"])
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
      calcDamage(botCurrent.name)
      setCharTurn(["bot", "attack"])
      const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","attack"]
            })
    }else if(protection != 0){//função chamada após player defender
      calcDamage(currentName)
    }
    
  },[protection])

  const [lifeChange, setLifeChange] = useState(false)
  
  async function calcDamage(pers) {

    const currentFinalDamage = damage - protection
    if (currentFinalDamage <= 0) {
      logDamageResult(0,pers)
      setFinalDamage(0)
      setDamage(0)
      setProtection(0)

      const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
              await updateDoc(battleTurnRef, {
                damage: 0
              })

    }else {
      logDamageResult(currentFinalDamage,pers)
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


  const [isEndBattle, setIsEndBattle] = useState(false)
 
  async function endBattle() {
    if (botCurrent.life <= 0) {
      
      console.log("fim, player vence");
      localStorage.removeItem("historicTempData")
      setIsEndBattle(true)
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokeBot"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","tempBattleData"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokePlayerTemp"))
      
      
      //navigate('/profile')
    }else if (currentLife <= 0){
      
      setIsEndBattle(true)
      console.log("fim, bot vence");
      localStorage.removeItem("historicTempData")
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokeBot"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","tempBattleData"))
      await deleteDoc(doc(db,"users",user.uid,"tempData","pokePlayerTemp"))
      
      //navigate('/profile')
    }else{
      setLifeChange(false)
    }
  }

  //-------------------Log Manager-------------------

  function logManager(valueTurn,nameTurn,action) {


    let attempt = ["Acertou", "Errou"]

    if (isTurnDamage == false) {
      if(action == "draw"){
        logDraw()
      }else if (currentAction == "initiative" ||  action == "initiative") {
        logInitiative(valueTurn,nameTurn)
      }else if(charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
        
        if (currentAction == "rangedAttack") {
          
          if (valueTurn <= currentAtributes.ability) {
            logAttackRanged(valueTurn,nameTurn,attempt[0])
          }else{
            logAttackRanged(valueTurn,nameTurn,attempt[1])
          }
          
        }else if(currentAction == "attack"){

          if (valueTurn <= currentAtributes.ability) {
            logAttackMelee(valueTurn,nameTurn,attempt[0])
          }else{
            logAttackMelee(valueTurn,nameTurn,attempt[1])
          }
        }
      } else if(charTurn[0] == "player" && charTurn[1] == "defense" && action != true){
        if (currentAction == "dodge") {
          logDodge(valueTurn,nameTurn)
        }else if(currentAction == "defend"){
          if (valueTurn == 6 + (currentAtributes.armor * 2) + currentAtributes.ability ) {
            logDefend(valueTurn,nameTurn,true)
          }else {
            logDefend(valueTurn,nameTurn)
          }
          
        }
      }else if(charTurn[0] == "player" && charTurn[1] == "defense" && action == true){
        logDefend(valueTurn,nameTurn)
      }else if(charTurn[0] == "bot" && charTurn[1] == "attack" ) {

        if (action == "rangerAttack") {
          
          if (valueTurn <= botCurrent.characteristics.ability) {
            logAttackRanged(valueTurn,nameTurn,attempt[0])
          }else{
            logAttackRanged(valueTurn,nameTurn,attempt[1])
          }
        }else if(action == "attack"){
          
          if (valueTurn <= botCurrent.characteristics.ability) {
            logAttackMelee(valueTurn,nameTurn,attempt[0])
          }else{
            logAttackMelee(valueTurn,nameTurn,attempt[1])
          }
        }
      } else if(charTurn[0] == "bot" && charTurn[1] == "defense"){

        if (action == "dodge") {
          logDodge(valueTurn,nameTurn)
        }else if(action == "defend"){
          if (valueTurn == 6 + (botCurrent.characteristics.armor * 2) + botCurrent.characteristics.ability) {
            logDefend(valueTurn,nameTurn,true)
          }else{
            logDefend(valueTurn,nameTurn,false)
          }
          
        }
      }

    }else if(isTurnDamage == true){

      if(charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {
        
        if (valueTurn == 6 + (currentAtributes.firePower * 2) + currentAtributes.ability || valueTurn == 6 + (currentAtributes.strength * 2) + currentAtributes.ability) {
          logAttackDamage(valueTurn,nameTurn,true)
        }else{
          logAttackDamage(valueTurn,nameTurn,false)
        }
      }
    }
    if (action == true && charTurn[0] == "bot") {
      
      if (valueTurn == 6 + (botCurrent.characteristics.firePower * 2) + botCurrent.characteristics.ability || valueTurn == 6 + (botCurrent.characteristics.strength * 2) + botCurrent.characteristics.ability) {
          logAttackDamage(valueTurn,nameTurn,true)
      }else{
        logAttackDamage(valueTurn,nameTurn,false)
      }
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

  function logDraw(){
    setTimeout(() => {
      historicTempCopy.text = `EMPATE!\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    }, 2020);
  }
  

  function logAttackMelee(valueTurn,nameTurn,attempt){
    
      historicTempCopy.text = `${nameTurn} Realiza Ataque Corpo a Corpo `
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
      setTimeout(() => {
        historicTempCopy.text = `- ${valueTurn} - ${attempt}\n`
        historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
        setHistoricTemp({...historicTemp,...historicTempCopy})
      }, 2010)
  }

  function logAttackRanged(valueTurn,nameTurn,attempt){
    
    historicTempCopy.text = `${nameTurn} Realiza Ataque a Distancia `
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
    setTimeout(() => {
      historicTempCopy.text = `- ${valueTurn} - ${attempt}\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    }, 2010)
}

function logDefend(valueTurn,nameTurn,critical){
  if (critical == true) {
    historicTempCopy.text = `${nameTurn} Defende - ${valueTurn} - CRÍTICO\n`
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
  }else{
    historicTempCopy.text = `${nameTurn} Defende - ${valueTurn}\n`
    historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
    setHistoricTemp({...historicTemp,...historicTempCopy})
  }
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

function logAttackDamage(valueTurn,nameTurn,critical){

  if (critical == true) {
    setTimeout(() => {
      historicTempCopy.text = `${nameTurn} Joga ${valueTurn} no dado de ataque - CRÍTICO!\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    }, 2010)
  }else{
    setTimeout(() => {
      historicTempCopy.text = `${nameTurn} Joga ${valueTurn} no dado de ataque\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})
    }, 2010)
  }
}

function logDamageResult(valueTurn,nameTurn){

      historicTempCopy.text = `${nameTurn} Recebe ${valueTurn} de dano\n`
      historicTempCopy.textLog = historicTempCopy.textLog + historicTempCopy.text
      setHistoricTemp({...historicTemp,...historicTempCopy})

    
}


 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected,rotateDice, diceRolling, setDiceRolling,isTurnDamage, setIsTurnDamage,damageFase,generateValue, dodged,possibleDodge,isEndBattle]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}
