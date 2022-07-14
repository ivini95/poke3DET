import { useContext } from 'react'
import { ApiContextCharPoke } from '../../../contexts/ApiContextCharPoke'
import './style.css'

function PopupCreatePoke(){

  const [ pokemons, setPokemons, count, setCount,urlPoke, setUrlPoke,resetChar, setResetChar, total, setTotal, manaLife, setManaLife, pokeName, setPokeName, charObj, setCharObj, imgPoke, setImgPoke,popupOpen,setPopupOpen ] = useContext(ApiContextCharPoke)

  return (
    <>
      {popupOpen == true ? <div className='popUpOpen'>
          <ul>
            <li>Selecione um pokemon utilizando a barra de rolagem ou setas (não influencia na jogabilidade).</li>
            <li>Distribua um total de 12 pontos entre os atributos abaixo.</li>
            <li><span>Força</span> - Determina a força de ataque corpo a corpo.</li>
            <li><span>Habilidade</span> - Determina a chance de acerto ao larçar um D6.</li>
            <li><span>Resitencia</span> - Ganha 5 pontos de vida e mana para cada ponto.</li>
            <li><span>Armadura</span> - Determina sua força de defesa.</li>
            <li><span>Poder de Fogo</span> - Determina sua força de ataque a distancia</li>
            <li><span>OBS</span>: Não é possivel distribuir mais de 5 pontos em um unico atributo. Cada Atributo deve conter ao menos 1 ponto.</li>
          </ul>
      </div> : <></>}
    </>
  )
}

export default PopupCreatePoke
