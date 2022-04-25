import { createContext, useState, useEffect } from "react";

const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800'

export const ApiContextCharPoke = createContext()

export function ApiProviderChar(props){

  const [total, setTotal] = useState(12)

  const [manaLife, setManaLife] = useState(0)

  const [pokemons, setPokemons] = useState([{name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}])

  const [count, setCount] = useState(0)

  const [urlPoke, setUrlPoke] = useState('https://pokeapi.co/api/v2/pokemon/1/')

  const [resetChar, setResetChar] = useState(0)

  useEffect(()=>{
    
    fetch(url).then(res=> res.json())
        .then(data=>setPokemons(data.results))
        
  },[])

  useEffect(()=>{
      setUrlPoke(pokemons[count].url)
  },[count])
  

  return(
    <ApiContextCharPoke.Provider value={[ pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife ]}>
      {props.children}
    </ApiContextCharPoke.Provider>
  )
}