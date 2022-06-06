import './style.css'
import { ApiProviderProfile } from '../../contexts/ApiContextProfile'
import ImgPokeProfile from '../../components/ProfilePage/ImgPokeProfile'
import LifePokeProfile from '../../components/ProfilePage/lifePokeProfile'
import ManaPokeProfile from '../../components/ProfilePage/manaPokeProfile'
import NickNameProfile from '../../components/ProfilePage/NickNameProfile'
import NavigateProfile from '../../components/ProfilePage/NavigateProfile'

function ProfilePage() {

  return (
    <div className='profileContainer'>
      <ApiProviderProfile>
        <ImgPokeProfile/>
        <LifePokeProfile/>
        <ManaPokeProfile/>
        <div>
        <NickNameProfile/>
        <NavigateProfile/>
        </div>
      </ApiProviderProfile>
    </div>
  )
}

export default ProfilePage