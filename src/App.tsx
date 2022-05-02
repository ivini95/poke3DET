import './styles/style.css'
import {BrowserRouter , Routes, Route } from "react-router-dom"
import ContainerPoke from "./pages/PokeCreate"
import BattlePage from "./pages/BattlePage"

function App() {

  return (

    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPoke/>}/>
          <Route path="battle" element={<BattlePage/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
