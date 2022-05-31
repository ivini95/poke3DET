import { createContext, useContext, useState } from "react";

export const ApiContextUser = createContext()

export function ApiProviderUser (props) {

  const [nickName, setNickName] = useState('')

  return (
    <ApiContextUser.Provider value={[nickName, setNickName]}>
      {props.children}
    </ApiContextUser.Provider>
  )

}