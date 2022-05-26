import ButtonCreate from '../../components/CreateNamePage/ButtonCreate'
import ButtonExit from '../../components/CreateNamePage/ButtonExit'
import InputNickName from '../../components/CreateNamePage/InputNickName'
import './style.css'

function CreateNamePage() {
  return (
    <div className="createNameContainer">
      <InputNickName/>
      <div className='buttonContainer'>
        <ButtonExit/>
        <ButtonCreate/>
      </div>
    </div>
  )
}

export default CreateNamePage