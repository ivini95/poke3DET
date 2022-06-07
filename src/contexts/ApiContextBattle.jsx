import { collection, doc, getDoc } from "firebase/firestore";
import { useState, createContext, useEffect } from "react";
import { db } from "../dataBase/firerebase";
import { UserAuth } from "./AuthContext";
import { bot } from "../components/bot";

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

  function action() {
    console.log(diceValue);
  }

  function attack() {
    console.log("ataque");
  }
  function rangedAttack() {
    console.log("ataque distancia");
  }
  function defend() {
    console.log("defesa");
  }
  function dodge() {
    console.log("esquiva");
  }

 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, botCurrent, action]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}