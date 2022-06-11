import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, createContext, useEffect } from "react";
import { db } from "../dataBase/firerebase";
import { UserAuth } from "./AuthContext";

export const ApiContextBattle = createContext()

export function ApiProviderBattle(props){

  const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800'

  const [pokemons, setPokemons] = useState({})

  useEffect(()=>{
    
    fetch(url).then(res=> res.json())
        .then(data=>setPokemons(data.results))
        
  },[])

  const {user} = UserAuth()

  useEffect(async ()=> {
    if (user.uid) {
      const pokeStatusRef = doc(db, "users", user.uid, "pokemon", "01")
      const pokeStatusRefSnap = await getDoc(pokeStatusRef)
      const pokeStatus = pokeStatusRefSnap.data()
      setCurrentLife(pokeStatus.life)
      setCurrentMana(pokeStatus.mana)
      setCurrentName(pokeStatus.name)
      setCurrentImg(pokeStatus.img)
      setCurrentAtribute(pokeStatus.characteristics)

      const botPokeRef = doc(db, "users", user.uid, "tempData", "pokeBot")
      const botPokeRefSnap = await getDoc(botPokeRef)
      const pokeBot = botPokeRefSnap.data()
      setBotCurrent(pokeBot)
    }
    
  },[user])

  

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
    'text': `Resultado Dado:${1}`,
    'textLog': ''
  })

  const [currentAction, setCurrentAction] = useState("")
  const [charTurn, setCharTurn] = useState("")
  const [damage, setDamage] = useState(0)
  const [protection, setProtection] = useState(0)

  useEffect(async ()=>{
    
    if (user.uid) {
    
    const isInitiativeRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
    const isInitiativeSnap = await getDoc(isInitiativeRef)
    const isInitiative = isInitiativeSnap.data()
    if (isInitiative.initiative == true) {
      
      setCurrentAction("initiative")
    }
    }
  },[user])


  useEffect(async () => {
    if (user.uid) {
      const turnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
      const turnSnap = await getDoc(turnRef)
      const turn = turnSnap.data()
      setCharTurn(turn.turn)
    }
    
  },[user]) 

  function action() {
    
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

  async function initiative(){
    
    let botDiceIniciative = 0
    botDiceIniciative = Math.floor(Math.random() * (6 - 0) + 1)
    
    if (botDiceIniciative > diceValue) {
      setCurrentAction("")
      setCharTurn(["bot","attack"])
      await setDoc(doc(db, "users", user.uid,"tempData","tempBattleData"), {
        turn: ["bot","attack"]
      })
      
      
      console.log("bot primeiro");
    }else if(botDiceIniciative < diceValue) {
      setCurrentAction("")
      setCharTurn(["player","attack"])
      await setDoc(doc(db, "users", user.uid,"tempData","tempBattleData"), {
        turn: ["player","attack"]
      })
      
      
      console.log("player primeiro");
    }else {
      console.log("Empate");
    }
  }

  useEffect(()=>{
    if (currentAction != "initiative") {
      if(charTurn[0] == "bot" && charTurn[1] == "attack" ){
        attack()
        
        console.log("bot ataque");
      }else if (charTurn[0] == "bot" && charTurn[1] == "defense" ){
        defend()
        console.log("bot defend");
      }
    }
    
      
    
  },[charTurn])

  async function attack() {
    if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {

      if (diceValue == 6) {
        const currentDamage = (diceValue + (currentAtributes.strength * 2) + currentAtributes.ability )
        setDamage(currentDamage)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","defense"]
            })
        console.log(charTurn, currentDamage);
        setCharTurn(["bot","defense"])
        setCurrentAction("")
        
      }else {
        const currentDamage = (diceValue + currentAtributes.strength + currentAtributes.ability )
        setDamage(currentDamage)
        console.log(charTurn, currentDamage);
        setCurrentAction("")
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","defense"]
            })
        setCharTurn(["bot","defense"])
       
        
      }
      
    }else if(charTurn[0] == "bot" && charTurn[1] == "attack") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      if (diceBot == 6) {
        const currentDamage = (diceBot + (botCurrent.characteristics.strength * 2) + botCurrent.characteristics.ability)
        console.log(charTurn, currentDamage);
        setDamage(currentDamage)
        setCharTurn(["player", "defense"])
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","defense"]
            })
        
      }else {
        const currentDamage = (diceBot + botCurrent.characteristics.strength + botCurrent.characteristics.ability)
        console.log(charTurn, currentDamage);
        setDamage(currentDamage)
        setCharTurn(["player", "defense"])
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","defense"]
            })
        
      }
      
    }
  }

  async function rangedAttack() {
    if (charTurn[0] == "player" && charTurn[1] == "attack" && damage == 0) {

      if (diceValue == 6) {
        const currentDamage = (diceValue + (currentAtributes.firePower * 2) + currentAtributes.ability )
        console.log(charTurn, currentDamage);
        setDamage(currentDamage)
        setCharTurn(["bot","defense"])
        setCurrentAction("")
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","defense"]
            })
        
        
      }else {
        const currentDamage = (diceValue + currentAtributes.firePower + currentAtributes.ability )
        console.log(charTurn, currentDamage);
        setDamage(currentDamage)
        setCharTurn(["bot","defense"])
        setCurrentAction("")
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","defense"]
            })
        
        
      }
      
    }else if(charTurn[0] == "bot" && charTurn[1] == "attack") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      if (diceBot == 6) {
        const currentDamage = (diceBot + (botCurrent.characteristics.firePower * 2) + botCurrent.characteristics.ability)
        console.log(charTurn, currentDamage);
        setDamage(currentDamage)
      }else {
        const currentDamage = (diceBot + botCurrent.characteristics.firePower + botCurrent.characteristics.ability)
        console.log(charTurn, currentDamage);
        setDamage(currentDamage)
      }
      
    }
  }
  async function defend() {

    if (charTurn[0] == "player" && charTurn[1] == "defense" && protection == 0) {
      
      if (diceValue == 6) {
        const currentProtection = (diceValue + (currentAtributes.armor * 2) + currentAtributes.ability )
        console.log(charTurn, currentProtection);
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })
        
        
      }else {
        const currentProtection = (diceValue + currentAtributes.armor + currentAtributes.ability )
        console.log(charTurn, currentProtection);
        setCharTurn(["player","attack"])
        setCurrentAction("")
        setProtection(currentProtection)
        const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["player","attack"]
            })
        
        
      }
      
    }else if(charTurn[0] == "bot") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)

      if (diceBot == 6) {
        const currentProtection = (diceBot + (botCurrent.characteristics.armor * 2) + botCurrent.characteristics.ability)
        console.log(charTurn, currentProtection);
        setProtection(currentProtection)
        
        
      }else {
        const currentProtection = (diceBot + botCurrent.characteristics.armor + botCurrent.characteristics.ability)
        console.log(charTurn, currentProtection);
        setProtection(currentProtection)
        
      }
    }
  }
  function dodge() {

    if (charTurn[0] == "player" && charTurn[1] == "defense") {

      const currentProtection = currentAtributes.ability - botCurrent.characteristics.ability
      
      if (currentProtection < 1) {
        console.log("impossivel esquivar");
      } else if (diceValue <= currentProtection){
        console.log("esquivou");
      } else {
        console.log("não esquivou");
      }
    
    } else if(charTurn[0] == "enemy" && charTurn[1] == "defense"){
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      const currentProtection = botCurrent.characteristics.ability - currentAtributes.ability
      
      if (currentProtection < 1) {
        console.log("impossivel esquivar");
      } else if (diceBot <= currentProtection){
        console.log("esquivou");
      } else {
        console.log("não esquivou");
      }
    }
  }

  const [finalDamage, setFinalDamage] = useState()



  useEffect(async ()=>{

    if (protection != 0 && charTurn[0] == "bot" && charTurn[1] == "defense") {
      calcDamage()
      setCharTurn(["bot", "attack"])
      const battleTurnRef = doc(db, "users", user.uid, "tempData", "tempBattleData")
            await updateDoc(battleTurnRef, {
              turn: ["bot","attack"]
            })
      
    }else if(protection != 0){
      calcDamage()
    }
    
  },[protection])


  const [lifeChange, setLifeChange] = useState(false)
  
  useEffect(async ()=>{
    
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
            setCurrentLife(currentLife - finalDamage)
            setLifeChange(true)
        }
      }
    }
  },[finalDamage])


  function calcDamage() {

    
      const currentFinalDamage = damage - protection
    if (currentFinalDamage <= 0) {
      
      setFinalDamage(0)
      setDamage(0)
      setProtection(0)
    }else {
      
      setFinalDamage(currentFinalDamage , "dano maior que 0")
      setDamage(0)
      setProtection(0)
    }

  }

  useEffect(()=> {
    if (lifeChange == true) {
        endBattle()
    }
  },[lifeChange])

  const [battleEnd, setBattleEnd] = useState(false)
  const [winner, setWinner] = useState("")

  function endBattle() {
    if (botCurrent.life <= 0) {
      console.log("fim, player vence");
    }else if (currentLife <= 0){
      console.log("fim, bot vence");
    }else{
      setLifeChange(false)
    }
    //resetar bot do banco de dados
    //resetar turno
    //redirecionar para tela profile
  }

 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn, pokeStatusSelected, setPokeStatusSelected]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}