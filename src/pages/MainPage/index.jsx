import { useState } from "react"
import BackButton from "../../components/AllComponentes/BackButton"
import MenuIcon from "../../components/AllComponentes/MenuIcon"
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"
import MenuComponent from "../../components/MainPage/MenuComponentOpen"
import PlayButton from "../../components/MainPage/PlayButton"
import TitleMain from "../../components/MainPage/TitleMain"
import "./style.css"
import profileImg from '../../assets/images/ProfilePrint.png'
import battleImg from '../../assets/images/BattlePrint.png'
import backGroundMainPage from '../../assets/images/backGroundMainPage.svg'

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
        {/* <img className="imgExemplo" src={profileImg} alt="imagem exemplo da pagina do perfil" />
        <img className="imgExemplo" src={battleImg} alt="imagem exemplo da pagina de batalha" /> */}
      </main>
      </div>
    </div>
    
  )
}

export default MainPage