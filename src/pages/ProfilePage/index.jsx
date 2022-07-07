import './style.css'
import { ApiProviderProfile } from '../../contexts/ApiContextProfile'
import ContainerStatusProfile from '../../components/ProfilePage/ContainerStatusProfile'
import NavigateProfile from '../../components/ProfilePage/NavigateProfile'
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"

function ProfilePage() {

  return (
    <div className='profileContainer'>
      <ApiProviderProfile>
        <h1 className="titleProfile">Poke3D&amp;T</h1>
        <ThemeIcon/>
        <ContainerStatusProfile/>
        <NavigateProfile/>
      </ApiProviderProfile>
    </div>
  )
}

export default ProfilePage