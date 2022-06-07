import { collection, getDocs } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../dataBase/firerebase";
import { UserAuth } from "./AuthContext";

const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800'

export const ApiContextCharPoke = createContext()

export function ApiProviderChar(props){

  const {user} = UserAuth()

  let navigate = useNavigate()

  const [total, setTotal] = useState(12)

  const [manaLife, setManaLife] = useState(0)

  const [pokemons, setPokemons] = useState([{name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}])

  const [count, setCount] = useState(0)

  const [urlPoke, setUrlPoke] = useState('https://pokeapi.co/api/v2/pokemon/1/')

  const [resetChar, setResetChar] = useState(0)

  const [pokeName, setPokeName] = useState('bulbasaur')

  const [charObj, setCharObj] = useState({'strength': 0,
  'ability': 0,
  'resistence': 0,
  'armor': 0,
  'firePower': 0})

  const [imgPoke, setImgPoke] = useState(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${count + 1}.png`)

  useEffect(()=>{
    
    fetch(url).then(res=> res.json())
        .then(data=>setPokemons(data.results))
        
  },[])

  useEffect(()=>{
      setUrlPoke(pokemons[count].url)
      setImgPoke(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${count + 1}.png`)
  },[count])


  useEffect(async ()=> {
    if (user.uid) {
        const pokeRef =  collection(db, "users", user.uid,"pokemon")
        const snapPokeRef = await getDocs(pokeRef)
        if (snapPokeRef.size > 0) {
          navigate('/profile')
      } 
    }
    
  }, [user])

  return(
    <ApiContextCharPoke.Provider value={[ pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke ]}>
      {props.children}
    </ApiContextCharPoke.Provider>
  )
}