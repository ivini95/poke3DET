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

  function generateBot() {
    
    bot.generateAtribute()
    const botNumber = bot.pokeNumber()
    const botChars = bot.atributes
    setBotCurrent( {
      number: botNumber,
      name: pokemons[botNumber].name,
      characteristics: {
        'strength': botChars[0],
        'ability': botChars[1],
        'resistence': botChars[2],
        'armor': botChars[3],
        'firePower': botChars[4]
      },
      life: botChars[2] * 5,
      mana: botChars[2] * 5,
      imgPoke:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${botNumber}.png`
    })
  }

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
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp, currentLife, setCurrentLife, currentMana, setCurrentMana, currentName, setCurrentName, currentImg, setCurrentImg,currentAtributes, setCurrentAtribute, attack, rangedAttack, defend, dodge, generateBot, botCurrent, action]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}