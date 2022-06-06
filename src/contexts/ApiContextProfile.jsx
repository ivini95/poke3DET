import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../dataBase/firerebase";
import { UserAuth } from "./AuthContext";

export const ApiContextProfile = createContext()

export function ApiProviderProfile(props) {

  const {user} = UserAuth()
  let navigate = useNavigate()

  useEffect(async ()=> {
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
  },[user])



  const [imgPoke, setImgPoke] = useState('')
  const [namePoke, setNamePoke] = useState('')
  const [lifePoke, setLifePoke] = useState(0)
  const [manaPoke, setManaPoke] = useState(0)
  const [atributesPoke, setAtributesPoke] = useState({})
  const [nickName, setNickName] = useState('')
  

  useEffect(async ()=> {
    const pokeRef =  collection(db, "users", user.uid,"pokemon")
    const snapPokeRef = await getDocs(pokeRef)
    if (snapPokeRef.size == 0) {
      navigate('/')
    } 
  }, [user])


  return (
    <ApiContextProfile.Provider value={[imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName]}>
      {props.children}
    </ApiContextProfile.Provider>
  )
}