import search from '../../../assets/images/search.svg'
import './style.css'

function FieldSearch(){

  return (
    <div className='fieldSearchContainer'>
      <label>
        <form action="">
          <input className='fieldSearch' type="text" placeholder="Buscar"></input>
          <button className='buttonSearch' >
            <img src={search} alt="" /></button>
        </form>
      </label>
    </div>
  )
}

export default FieldSearch