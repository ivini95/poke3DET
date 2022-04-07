import {useState, createContext } from "react";

export const ContextCharPoke = createContext()


export function CharProvider(props){

  const [total, setTotal] = useState(12)

  const [manaLife, setManaLife] = useState(0)


  return (
   <ContextCharPoke.Provider value={[total, setTotal, manaLife, setManaLife]}>
     {props.children}
   </ContextCharPoke.Provider> 
  )
}