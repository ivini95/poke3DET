import { ApiProviderChar } from '../../contexts/ApiContextCharPoke'
import { CharProvider } from '../../contexts/ContextCharPoke'
import Background from '../../components/Background'
import ButtonChar from '../../components/ButtonChar'
import ImgCharPoke from '../../components/ImgCharPoke'
import LifeMana from '../../components/LifeMana'
import NameCharPoke from '../../components/NameCharPoke'
import ResetButton from '../../components/ResetButton'
import SaveButton from '../../components/SaveButton'
import TotalPoints from '../../components/TotalPoints'
import './style.css'

function ContainerPoke() {
  return (
    
    <div className="containerPoke">
      <Background/>
      <CharProvider>
            <ApiProviderChar>
            <ImgCharPoke></ImgCharPoke>
            <NameCharPoke></NameCharPoke>
            
            <LifeMana></LifeMana>
            <TotalPoints></TotalPoints>
            <ButtonChar className={"force pokeStatus"} typeChar={'Força'} value={0}></ButtonChar>
            <ButtonChar className={"ability pokeStatus"} typeChar={'Habilidade'} value={0}></ButtonChar>
            <ButtonChar className={"resistence pokeStatus"} typeChar={'Resistência'} value={0}></ButtonChar>
            <ButtonChar className={"armor pokeStatus"} typeChar={'Armadura'} value={0}></ButtonChar>
            <ButtonChar className={"firePower pokeStatus"} typeChar={'Poder de fogo'} value={0}></ButtonChar>
            <ResetButton teste={'teste'}></ResetButton>
            <SaveButton></SaveButton>
            </ApiProviderChar>
        </CharProvider>
    </div>
  )
}

export default ContainerPoke