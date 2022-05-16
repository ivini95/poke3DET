import FieldSearch from "../../AllComponentes/FieldSearch"
import './style.css'

function MenuComponent(){
  return (
    <div className="ContainerMenuOpen">
        <FieldSearch/>
        <div className="buttonContainer">
          <button className="button navigateButton">Como Jogar</button>
          <button className="button navigateButton">Sobre</button>
        </div>
        <div className="links"></div>
    </div>
  )
}

export default MenuComponent