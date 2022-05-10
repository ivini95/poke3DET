import searchRed from '../../../assets/images/searchRed.png'
import './style.css'

function FieldSearch(){
  return (
    <div className='fieldSearchContainer'>
      <label>
        <form action="">
          <input className='fieldSearch' type="text" placeholder="Buscar"></input>
          <button className='buttonSearch' type="submit"><img className='buttonSearchImg' src={searchRed} alt="" /></button>
        </form>
      </label>
    </div>
  )
}

export default FieldSearch