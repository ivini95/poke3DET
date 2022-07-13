import { ApiProviderChar } from '../../contexts/ApiContextCharPoke'
import ButtonChar from '../../components/PokeCreatePage/ButtonChar'
import ImgCharPoke from '../../components/PokeCreatePage/ImgCharPoke'
import LifeMana from '../../components/PokeCreatePage/LifeMana'
import NameCharPoke from '../../components/PokeCreatePage/NameCharPoke'
import ResetButton from '../../components/PokeCreatePage/ResetButton'
import SaveButton from '../../components/PokeCreatePage/SaveButton'
import TotalPoints from '../../components/PokeCreatePage/TotalPoints'
import './style.css'
import ThemeIcon from '../../components/AllComponentes/ThemeIcon'


function ContainerPoke() {

  return (
      <div className="containerPoke">
              <ApiProviderChar>
                <ImgCharPoke></ImgCharPoke>
                <NameCharPoke></NameCharPoke>
                <LifeMana></LifeMana>
                <div className='createPokeThemeIconContainer'>
                  <div className='createPokeThemeIcon'>
                  <ThemeIcon></ThemeIcon>
                  </div>
                </div>
                
                
                <TotalPoints></TotalPoints>
                <ButtonChar className={"force pokeStatus"} typeChar={'Força'} value={0}></ButtonChar>
                <ButtonChar className={"ability pokeStatus"} typeChar={'Habilidade'} value={0}></ButtonChar>
                <ButtonChar className={"resistence pokeStatus"} typeChar={'Resistência'} value={0}></ButtonChar>
                <ButtonChar className={"armor pokeStatus"} typeChar={'Armadura'} value={0}></ButtonChar>
                <ButtonChar className={"firePower pokeStatus"} typeChar={'Poder de fogo'} value={0}></ButtonChar>
                <ResetButton></ResetButton>
                <SaveButton></SaveButton>
              </ApiProviderChar>
      </div>
  )
}

export default ContainerPoke