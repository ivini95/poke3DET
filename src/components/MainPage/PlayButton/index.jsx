import './style.css'
import {useNavigate} from 'react-router-dom'



function PlayButton() {

  let navigate = useNavigate()

  return (
    <button onClick={() => navigate('/create')} className="button navigateButton playButton" >Jogar</button>
  )
}

export default PlayButton