import { useNavigate } from 'react-router-dom';
import './style.css'


function SaveButton(){

  let navigate = useNavigate()

  function save(){
    navigate("/battleBot/5")
  }

  return (
    <div className="save">
      <button className="button buttonSave" type="submit" onClick={save}>Salvar</button>
    </div>
  )
}

export default SaveButton