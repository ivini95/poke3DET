import LoginButton from "../../components/LoginPage/LoginButton/LoginButton"
import './style.css'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import {UserAuth} from '../../contexts/AuthContext'

function LoginPage() {

  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  
  useEffect(()=> {
    if (user != null) {
      navigate('/createnick')
    }
  }, [user])

  return (
    <div className="loginContainer">
      <LoginButton/>
    </div>
  )
}

export default LoginPage