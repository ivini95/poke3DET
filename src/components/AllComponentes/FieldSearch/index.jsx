import searchRed from '../../../assets/images/searchRed.svg'
import './style.css'

function FieldSearch(){

  function log(){
    console.log('teste');
  }

  return (
    <div className='fieldSearchContainer'>
      <label>
        <form action="">
          <input className='fieldSearch' type="text" placeholder="Buscar"></input>
          <button className='button buttonSearch' >
            <img src={searchRed} alt="" /></button>
        </form>
      </label>
    </div>
  )
}

export default FieldSearch