import { useState } from "react"
import BackButton from "../../components/AllComponentes/BackButton"
import MenuIcon from "../../components/AllComponentes/MenuIcon"
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"
import MenuComponent from "../../components/MainPage/MenuComponentOpen"
import PlayButton from "../../components/MainPage/PlayButton"
import TitleMain from "../../components/MainPage/TitleMain"
import "./style.css"
import battlePageMobile from '../../assets/images/battlePageMobile.jpg'
import createPokeMobile from '../../assets/images/createPokeMobile.jpg'
import profileMobile from '../../assets/images/profileMobile.jpg'


function MainPage() {

  const [sideBar, setSideBar] = useState(false)

  return (
    <div>
      {sideBar ? (<div>
        <BackButton onCloseSideBar={()=>setSideBar(!sideBar)}/>
        <MenuComponent/>
      </div>) : (<></>)}
      <div className="mainpageContainer">
      <header>
        <div className="headerFirst">
        <MenuIcon onViewSideBar={()=>setSideBar(!sideBar)}/>
        <TitleMain/>
        <div className="mainThemeIcon">
        <ThemeIcon/>
        </div>
        
        </div>
        <div className="headerSecond">
          <PlayButton/>
        </div>
      </header>
      <main className="mainContainer">
        <ul className="carousel">
          <li className="imgItem">
            <img className="imgExemplo" src={battlePageMobile} alt="imagem exemplo da pagina de batalha" />
          </li>
          <li className="imgItem">
            <img className="imgExemplo" src={createPokeMobile} alt="imagem exemplo da pagina de criação do pokemon" />
          </li>
          <li className="imgItem">
            <img className="imgExemplo" src={profileMobile} alt="imagem exemplo da pagina de perfil" />
          </li>
        </ul>

      </main>
      </div>
    </div>
    
  )
}

export default MainPage