import './styles/style.css'
import {BrowserRouter , Routes, Route } from "react-router-dom"
import ContainerPoke from "./pages/PokeCreatePage"
import BattlePage from "./pages/BattlePage"
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import { ApiProviderAuthGoogle } from './contexts/AuthContext'
import CreateNamePage from './pages/CreateNamePage'

function App() {

  return (
    <div>
      <ApiProviderAuthGoogle>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="login" element={<LoginPage/>} />
            <Route path="createnick" element={<CreateNamePage/>}/>
            <Route path="createPoke" element={<ContainerPoke/>}/>
            <Route path="battle" element={<BattlePage/>}></Route>
          </Routes>
        </BrowserRouter>
      </ApiProviderAuthGoogle>
    </div>
  )
}

export default App
