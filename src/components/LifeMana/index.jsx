import LifePoints from '../LifePoints'
import ManaPoints from '../ManaPoints'
import './style.css'

function LifeMana(){
  return(
    <div className="lifeMana">
      <LifePoints></LifePoints>
      <ManaPoints></ManaPoints>
    </div>
  )
}

export default LifeMana