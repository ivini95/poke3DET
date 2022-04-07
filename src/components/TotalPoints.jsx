import { useState, useContext,useEffect  } from "react"
import {ContextCharPoke } from "../contexts/ContextCharPoke"

function TotalPoints(props){

  const [total, setTotal] = useContext(ContextCharPoke)

  return(
    
    <div className="totalPoints">
      <h1 >Total</h1>
      <div className="number">{total}</div>
    </div>
    
  )
}

export default TotalPoints