import { createContext, useState, useEffect } from "react";

const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'

export const ApiContextCharPoke = createContext()

export function ApiProviderChar(props){

  const [pokemons, setPokemons] = useState('')

  const [count, setCount] = useState(0)

  const [urlPoke, setUrlPoke] = useState('https://pokeapi.co/api/v2/pokemon/1/')

  const [pokemonSelected, setPokemonSelected] = useState([])

  useEffect(()=>{
    fetch(url).then(res=> res.json())
        .then(data=>setPokemons(data.results)
    )
    
  },[])

  useEffect(()=>{
    fetch(urlPoke).then(res=> res.json()).then(data=>{
      setPokemonSelected(data)
    })
  },[urlPoke])

  return(
    <ApiContextCharPoke.Provider value={[ pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke ]}>
      {props.children}
    </ApiContextCharPoke.Provider>
  )
}