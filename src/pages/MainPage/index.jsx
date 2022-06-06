import { useState } from "react"
import BackButton from "../../components/AllComponentes/BackButton"
import MenuIcon from "../../components/AllComponentes/MenuIcon"
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"
import MenuComponent from "../../components/MainPage/MenuComponentOpen"
import PlayButton from "../../components/MainPage/PlayButton"
import TitleMain from "../../components/MainPage/TitleMain"
import "./style.css"

function MainPage() {

  const [sideBar, setSideBar] = useState(false)

  return (
    <div className="mainpageContainer">
      {sideBar ? (<div>
        <BackButton onCloseSideBar={()=>setSideBar(!sideBar)}/>
        <MenuComponent/>
      </div>) : (<></>)}
      <header>
        <div className="headerFirst">
        <MenuIcon onViewSideBar={()=>setSideBar(!sideBar)}/>
        <TitleMain/>
        <ThemeIcon/>
        </div>
        <div className="headerSecond">
          <PlayButton/>
        </div>
      </header>
      <main className="mainContainer">
        <div className="containerImg"></div>
        <div className="containerImg"></div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default MainPage