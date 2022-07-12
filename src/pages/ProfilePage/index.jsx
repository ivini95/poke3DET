import './style.css'
import { ApiProviderProfile } from '../../contexts/ApiContextProfile'
import ContainerStatusProfile from '../../components/ProfilePage/ContainerStatusProfile'
import NavigateProfile from '../../components/ProfilePage/NavigateProfile'
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"

function ProfilePage() {

  return (
    <div className='profileContainer'>
      <ApiProviderProfile>
        <div className='topContainerProfile'>
        <h1 className="titleProfile">Poke3D&amp;T</h1>
        <div className='profileThemeIcon'><ThemeIcon/></div>
        </div>
        <ContainerStatusProfile/>
        <NavigateProfile/>
      </ApiProviderProfile>
    </div>
  )
}

export default ProfilePage