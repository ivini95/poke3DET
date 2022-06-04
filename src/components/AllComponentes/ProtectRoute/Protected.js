import { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import {UserAuth} from '../../../contexts/AuthContext'

const Protected = ({children}) => {

  const {user} = UserAuth()

  const navigate = useNavigate()

  useEffect(()=> {
    if (!user) {
      console.log('teste');
      return navigate('/')
    }
  },[user])
  return children
}

export default Protected