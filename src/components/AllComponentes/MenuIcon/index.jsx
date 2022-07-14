import './style.css'
import menuIcon from '../../../assets/images/menuIcon.svg'


function MenuIcon(props){

  return (
    <>
      <button onClick={()=> props.onViewSideBar()} className='menuIconButton'><img className='menuIcon' src={menuIcon} alt="" /></button>
    </>
  )
}

export default MenuIcon