import './style.css'
import sun from '../../../assets/images/sun.svg'

function ThemeIcon(){
  return (
    <div>
      <img className='sunIcon' src={sun} alt="" />
    </div>
  )
}

export default ThemeIcon