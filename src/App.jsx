import ButtonChar from "./components/ButtonChar"
import TotalPoints from "./components/TotalPoints"
import LifePoints from "./components/LifePoints"
import ManaPoints from "./components/ManaPoints"
import NameCharPoke from "./components/NameCharPoke"
import { CharProvider } from "./contexts/ContextCharPoke"
import ImgCharPoke from "./components/ImgCharPoke"
import { ApiProviderChar } from "./contexts/ApiContextCharPoke"
import ResetButton from "./components/ResetButton"
import SaveButton from "./components/SaveButton"
import './styles/style.css'




function App() {

  return (
    
    <div>
      <div className="background"></div>
      <div className="container">
        <CharProvider>
          <ApiProviderChar>
          <ImgCharPoke></ImgCharPoke>
          <NameCharPoke></NameCharPoke>
          </ApiProviderChar>
          <div className="lifeMana">
            <LifePoints></LifePoints>
            <ManaPoints></ManaPoints>
          </div>
          <TotalPoints></TotalPoints>
          <ButtonChar className={"force pokeStatus"} typeChar={'Força'} value={0}></ButtonChar>
          <ButtonChar className={"ability pokeStatus"} typeChar={'Habilidade'} value={0}></ButtonChar>
          <ButtonChar className={"resistence pokeStatus"} typeChar={'Resistência'} value={0}></ButtonChar>
          <ButtonChar className={"armor pokeStatus"} typeChar={'Armadura'} value={0}></ButtonChar>
          <ButtonChar className={"firePower pokeStatus"} typeChar={'Poder de fogo'} value={0}></ButtonChar>
          <ResetButton></ResetButton>
          <SaveButton></SaveButton>
        </CharProvider>
      </div>
    </div>
  )
}

export default App
