import React, { createContext } from 'react'

export const UserDataContext=createContext();

const UserContext = ({children}) => {

    const user={}

  return (
    <div>
        <UserDataContext.Provider>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext