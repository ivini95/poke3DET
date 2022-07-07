import ImgPokeProfile from './ImgPokeProfile'
import LifePokeProfile from './LifePokeProfile'
import ManaPokeProfile from './ManaPokeProfile'
import NickNameProfile from './NickNameProfile'
import TotalPointsProfile from './TotalPointsProfile'
import './style.css'
import AtributesProfile from './atributesProfile'

function containerStatusProfile(){


  return (
    <div className='containerStatusProfile'>
        <ImgPokeProfile/>
        <div className="containerPrincipalStatus">
          <TotalPointsProfile/>
          <LifePokeProfile/>
          <ManaPokeProfile/>
        </div>
        <AtributesProfile/>
        <NickNameProfile/>
    </div>
  )
}

export default containerStatusProfile