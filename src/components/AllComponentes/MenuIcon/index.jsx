import './style.css'
import menuIcon from '../../../assets/images/menuWhite.png'


function MenuIcon(props){

  return (
    <div>
      <button onClick={()=> props.onViewSideBar()} className='menuIconButton'><img className='menuIcon' src={menuIcon} alt="" /></button>
    </div>
  )
}

export default MenuIcon