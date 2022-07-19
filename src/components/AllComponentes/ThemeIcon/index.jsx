import './style.css'
import sun from '../../../assets/images/sun.svg'
import moon from '../../../assets/images/moon.svg'
import { useEffect, useState } from 'react'
import { UserAuth } from '../../../contexts/AuthContext'

function ThemeIcon(){

  const [themeSelect, setThemeSelect] = useState()

  const {user} = UserAuth()

  function changeTheme(){
    setThemeSelect(!themeSelect)
    
  }

  useEffect(()=>{
    if (themeSelect == true) {
      document.documentElement.style.setProperty('--dark-purple', '#FFFFFF')
      document.documentElement.style.setProperty('--white', '#2E293Dff')
      localStorage.setItem("themeSelect",JSON.stringify(true))
    }else if(themeSelect == false){
      document.documentElement.style.setProperty('--dark-purple', '#2E293Dff')
      document.documentElement.style.setProperty('--white', '#FFFFFF')
      localStorage.setItem("themeSelect",JSON.stringify(false))
    }
  },[themeSelect])


  useEffect(()=>{//recupera dados do local storage
    
    const themeStorage = JSON.parse(localStorage.getItem("themeSelect"))
      if (themeStorage != null) {
        setThemeSelect(themeStorage)
      }
      console.log(themeStorage);
  },[user]) 

  return (
    <div>
      {themeSelect ? <img onClick={changeTheme} className='moonIcon' src={moon} alt="imagem de uma lua" /> : <img onClick={changeTheme} className='sunIcon' src={sun} alt="imagem de um sol" />}
    </div>
  )
}

export default ThemeIcon