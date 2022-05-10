import BackButton from "../../AllComponentes/backButton"
import FieldSearch from "../../AllComponentes/FieldSearch"
import './style.css'

function MenuComponent(){
  return (
    <div className="ContainerMenuOpen">
        <FieldSearch/>
        <div className="buttonContainer">
          <button className="buttonMenu">Como Jogar</button>
          <button className="buttonMenu">Sobre</button>
        </div>
        <div className="links"></div>
    </div>
  )
}

export default MenuComponent