import { collection, doc, getDoc } from "firebase/firestore";
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

  const [historicTemp, setHistoricTemp] = useState({
    'id':0,
    'diceValue': diceValue,
    'text': `Resultado Dado:${1}`,
    'textLog': ''
  })

  const [currentAction, setCurrentAction] = useState("initiative")
  const [charTurn, setCharTurn] = useState("")

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

  function initiative(){
    let botDiceIniciative = 0
    botDiceIniciative = Math.floor(Math.random() * (6 - 0) + 1)
    
    if (botDiceIniciative > diceValue) {
      setCharTurn("bot")
      setCurrentAction("")
      console.log("bot primeiro");
    }else if(botDiceIniciative < diceValue) {
      setCharTurn("player")
      setCurrentAction("")
      console.log("player primeiro");
    }
  }

  useEffect(()=>{
    if(charTurn == "bot"){
      attack()
      setCharTurn("player")
      console.log("bot ataque");
    }
  },[charTurn])

  function attack() {
    if (charTurn == "player") {
      const damage = (diceValue + currentAtributes.strength + currentAtributes.ability )
      console.log(charTurn, damage);
      setCharTurn("bot")
      setCurrentAction("")
    }else if(charTurn == "bot") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      const damage = (diceBot + botCurrent.characteristics.strength + botCurrent.characteristics.ability)
      console.log(charTurn, damage);
    }
    
  }
  function rangedAttack() {
    if (charTurn == "player") {
      const damage = (diceValue + currentAtributes.firePower + currentAtributes.ability )
      console.log(charTurn, damage);
      setCharTurn("bot")
      setCurrentAction("")
    }else if(charTurn == "bot") {
      const diceBot = Math.floor(Math.random() * (6 - 0) + 1)
      const damage = (diceBot + botCurrent.characteristics.firePower + botCurrent.characteristics.ability)
      console.log(charTurn, damage);
    }
  }
  function defend() {
    console.log("defesa");
  }
  function dodge() {
    console.log("esquiva");
  }

 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action,currentAction, setCurrentAction,charTurn]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}