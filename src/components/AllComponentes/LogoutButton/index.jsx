import './style.css'
import {UserAuth} from '../../../contexts/AuthContext'

function LogoutButton() {

  
  const {user, logOut} = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
      console.log('usuario deslogado', user);
    } catch (error) {
      console.log(error);
    }
  }

  return (

  <button onClick={handleSignOut}>Logout</button>
  
  )
  
}

export default LogoutButton