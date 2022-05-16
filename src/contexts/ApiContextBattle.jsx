import { useState, createContext, useEffect } from "react";


export const ApiContextBattle = createContext()

export function ApiProviderBattle(props){
  
  const [diceValue , setDiceValue] = useState(1)

  const [historicTemp, setHistoricTemp] = useState({
    'id':0,
    'diceValue': diceValue,
    'text': `Resultado Dado:${1}`,
    'textLog': []
  })

  useEffect(()=>{
    
  },[historicTemp.ud])

 return (
  <ApiContextBattle.Provider value={[diceValue , setDiceValue, historicTemp, setHistoricTemp]}>
    {props.children}
  </ApiContextBattle.Provider>
 )

}