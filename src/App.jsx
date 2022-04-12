import ContainerPoke from "./pages/pokeCreate"
import './styles/style.css'
import {BrowserRouter , Routes, Route } from "react-router-dom"

function App() {

  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/createpoke" element={<ContainerPoke/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
