import ImgPokeProfile from './ImgPokeProfile'
import LifePokeProfile from './LifePokeProfile'
import ManaPokeProfile from './ManaPokeProfile'
import NickNameProfile from './NickNameProfile'
import './style.css'

function containerStatusProfile(){
  return (
    <div className='containerStatusProfile'>
        <ImgPokeProfile/>
        <LifePokeProfile/>
        <ManaPokeProfile/>
        <NickNameProfile/>
    </div>
  )
}

export default containerStatusProfile