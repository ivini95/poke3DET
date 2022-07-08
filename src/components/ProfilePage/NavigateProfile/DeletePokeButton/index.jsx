import './style.css'
import delPoke from '../../../../assets/images/delPokeIcon.svg'
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../../../../contexts/AuthContext';
import {useNavigate } from 'react-router-dom'
import { db } from '../../../../dataBase/firerebase';

function DeletePokeButton(){

  const {user} = UserAuth()

  const navigate = useNavigate()

  async function deletePoke(){
    await deleteDoc(doc(db,"users",user.uid,"pokemon","01"));
    navigate('/createPoke')
    console.log(userRef);
  }

  return (
    <img src={delPoke} onClick={deletePoke} alt="simbolo de pessoa com x ao lado" />
  )
}

export default DeletePokeButton