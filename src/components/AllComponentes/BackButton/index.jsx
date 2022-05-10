import exitIcon from '../../../assets/images/exitIcon.png'
import './style.css'

function BackButton(props){

  return (
  <div className='exitButton' onClick={()=> props.onCloseSideBar()}>
    <img className='backArrow' src={exitIcon} alt="" />
  </div>
  )
}

export default BackButton