import { useContext } from 'react'
import { ApiContextProfile } from '../../../../contexts/ApiContextProfile'
import './style.css'
import baseImg from "../../../../assets/images/baseImg.svg"

function ImgPokeProfile() {

  const [imgPoke,namePoke,lifePoke,manaPoke,atributesPoke,nickName] = useContext(ApiContextProfile)

  return (
        <div className='containerImgProfile'>
        <img className='imgProfile' src={imgPoke} alt="imagem do pokemon" />
        <img className='shadowImg' src={baseImg} alt="sombra da imagem" />
      </div>
  )
}

export default ImgPokeProfile