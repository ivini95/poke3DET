import './style.css'
import {useNavigate} from 'react-router-dom'

function PlayButton() {

  let navigate = useNavigate()

    return (
    <button onClick={() => navigate('/login')} className="button navigateButton playButton" >Jogar</button>
  )  

 
}

export default PlayButton