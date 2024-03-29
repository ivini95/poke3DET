import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult, updateCurrentUser } from "firebase/auth";
import {auth} from "../dataBase/firerebase";


const ApiContextAuthGoogle = createContext();

export function ApiProviderAuthGoogle(props) {

  const [user, setUser] = useState({})

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
     setUser(user)
     
    })
    return () => {
      unsubscribe()
    }
  }, [])


  return (
    <ApiContextAuthGoogle.Provider value={{googleSignIn, logOut, user}}>
      {props.children}
    </ApiContextAuthGoogle.Provider>
  )
}

export const UserAuth =  () => {

  return useContext(ApiContextAuthGoogle)
}