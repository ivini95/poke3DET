import './style.css'
import {UserAuth} from '../../../../contexts/AuthContext'
import logout from '../../../../assets/images/logOut.svg'

function logoutButtonProfile(){
  
  const {user, logOut} = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <img className='buttonLogoutProfile' src={logout} alt="" onClick={handleSignOut} />

  )
}

export default logoutButtonProfile