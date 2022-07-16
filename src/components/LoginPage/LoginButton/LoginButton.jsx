import './style.css'
import googleIcon from '../../../assets/images/googleIcon.svg'
import {UserAuth} from '../../../contexts/AuthContext'


function LoginButton() {

  const { googleSignIn} = UserAuth()

 
  async function handleGoogleSignIn() {
    try {
      await googleSignIn()
    } catch (error) {
      
    }
  }


  return (
    <button onClick={handleGoogleSignIn} className="button navigateButton loginButton" >Acessar com Google</button>
  ) 
}



export default LoginButton