import './styles/style.css'
import {BrowserRouter , Routes, Route } from "react-router-dom"
import ContainerPoke from "./pages/PokeCreatePage"
import BattlePage from "./pages/BattlePage"
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import { ApiProviderAuthGoogle } from './contexts/AuthContext'
import CreateNamePage from './pages/CreateNamePage'
import Protected from './components/AllComponentes/ProtectRoute/Protected'


function App() {

  return (
    <>
      <ApiProviderAuthGoogle>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="login" element={<LoginPage/>} />
            <Route path="createnick" element={
              <Protected>
                <CreateNamePage/>
              </Protected> }/>
            <Route path="createPoke" element={
              <Protected>
                <ContainerPoke/>
              </Protected>}/>,
            <Route path="battle" element={
              <Protected>
                <BattlePage/>
              </Protected>}></Route>
          </Routes>
        </BrowserRouter>
      </ApiProviderAuthGoogle>
    </>
  )
}

export default App
