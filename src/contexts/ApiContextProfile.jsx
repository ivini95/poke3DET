import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { createContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bot } from "../components/bot";
import { db } from "../dataBase/firerebase";
import { UserAuth } from "./AuthContext";

export const ApiContextProfile = createContext()

export function ApiProviderProfile(props) {

  const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800'

  const [pokemons, setPokemons] = useState({})

  useEffect(()=>{
    
    fetch(url).then(res=> res.json())
        .then(data=>setPokemons(data.results))
        
  },[])

  const {user} = UserAuth()
  let navigate = useNavigate()

  useEffect(async ()=> {
    if (user.uid) {
      const nickRef = doc(db,"users", user.uid)
      const nickSnap = await getDoc(nickRef)
      const nickName = nickSnap.data()
    
      const pokeStatusRef = doc(db, "users", user.uid, "pokemon", "01")
      const pokeStatusRefSnap = await getDoc(pokeStatusRef)
      const pokeStatus = pokeStatusRefSnap.data()
      setLifePoke(pokeStatus.life)
      setManaPoke(pokeStatus.mana)
      setNamePoke(pokeStatus.name)
      setImgPoke(pokeStatus.img)
      setAtributesPoke(pokeStatus.characteristics)
      setNickName(nickName.nickName)
    }
    
  },[user])

  
  const [imgPoke, setImgPoke] = useState('')
  const [namePoke, setNamePoke] = useState('')
  const [lifePoke, setLifePoke] = useState(0)
  const [manaPoke, setManaPoke] = useState(0)
  const [atributesPoke, setAtributesPoke] = useState({})
  const [nickName, setNickName] = useState('')
  
  

  useEffect(async ()=> {
    if (user.uid) {
      const pokeRef =  collection(db, "users", user.uid,"pokemon")
      const snapPokeRef = await getDocs(pokeRef)
      if (snapPokeRef.size == 0) {
        navigate('/')
    } 
    }
    
  }, [user])

  async function saveCurrentBot() {
    bot.generateAtribute()
    const botNumber = bot.pokeNumber()
    const botChars = bot.atributes

    const tempBattleRef = collection(db, "users", user.uid, "tempData")
      await setDoc(doc(tempBattleRef, "pokeBot"), {
        number: botNumber,
        name: pokemons[botNumber - 1].name,
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

      const pokeRef = doc(db, "users", user.uid, "pokemon", "01")
      const pokeRefSnap = await getDoc(pokeRef)
      const poke = pokeRefSnap.data()

      const temDataRef = collection(db, "users", user.uid, "tempData")
      await setDoc(doc(temDataRef, "pokePlayerTemp"), {
        poke
      })
    
  }

  async function createTempBattleData() {
    const pokeRef = collection(db, "users", user.uid, "tempData")
      await setDoc(doc(pokeRef, "tempBattleData"), {
        initiative: true
      })
  }

  return (
    <ApiContextProfile.Provider value={[imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName, saveCurrentBot,createTempBattleData]}>
      {props.children}
    </ApiContextProfile.Provider>
  )
}