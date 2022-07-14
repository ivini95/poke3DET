import { useState } from "react"
import BackButton from "../../components/AllComponentes/BackButton"
import MenuIcon from "../../components/AllComponentes/MenuIcon"
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"
import MenuComponent from "../../components/MainPage/MenuComponentOpen"
import PlayButton from "../../components/MainPage/PlayButton"
import TitleMain from "../../components/MainPage/TitleMain"
import "./style.css"
import battlePageMobile from '../../assets/images/battlePageMobile.png'
import createPokeMobile from '../../assets/images/createPokeMobile.png'
import profileMobile from '../../assets/images/profileMobile.png'

function MainPage() {

  const [sideBar, setSideBar] = useState(false)

  return (
    <div>
      {sideBar ? (<div className="menuContainerMainPage">
        <BackButton onCloseSideBar={()=>setSideBar(!sideBar)}/>
        <MenuComponent/>
      </div>) : (<></>)}
      <div className="mainpageContainer">
      <header>
        <div className="headerFirst">
        <MenuIcon onViewSideBar={()=>setSideBar(!sideBar)}/>
        <div className="menuHeader">
          <button className="linkHeader">COMO JOGAR</button>
          <button className="linkHeader">SOBRE</button>
        </div>
        <div className="titleHeaderContainer">
          <TitleMain/>
        </div>
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
            <img className="imgExemplo" src={createPokeMobile} alt="imagem exemplo da pagina de criação do pokemon" />
          </li>
          <li className="imgItem">
            <img className="imgExemplo" src={profileMobile} alt="imagem exemplo da pagina de perfil" />
          </li>
          <li className="imgItem">
            <img className="imgExemplo" src={battlePageMobile} alt="imagem exemplo da pagina de batalha" />
          </li>
        </ul>

      </main>
      </div>
    </div>
    
  )
}

export default MainPage