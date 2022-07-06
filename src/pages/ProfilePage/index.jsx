import './style.css'
import { ApiProviderProfile } from '../../contexts/ApiContextProfile'
import ContainerStatusProfile from '../../components/ProfilePage/ContainerStatusProfile'
import NavigateProfile from '../../components/ProfilePage/NavigateProfile'
import TitleMain from "../../components/MainPage/TitleMain"
import ThemeIcon from "../../components/AllComponentes/ThemeIcon"

function ProfilePage() {

  return (
    <div className='profileContainer'>
      <ApiProviderProfile>
        <TitleMain/>
        <ThemeIcon/>
        <ContainerStatusProfile/>
        <NavigateProfile/>
      </ApiProviderProfile>
    </div>
  )
}

export default ProfilePage