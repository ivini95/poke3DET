import { useState, createContext } from "react";


export const ApiContextBattle = createContext()

export function ApiProviderBattle(props){
  
  const [diceValue , setDiceValue] = useState(1)

 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}