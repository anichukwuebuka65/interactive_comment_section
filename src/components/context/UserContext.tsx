import React, { createContext, useContext, useEffect, useState } from 'react'
import { userType } from '../../types/types'
//import { fetchData } from '../Comment'
import { currentUser } from '../../data'

 const userContext = createContext<{user:userType }| null>(null)

export function useUserContext() {
    return useContext(userContext) as {user:userType}
}

export default function UserContext({children}:{children:React.ReactElement}) {
    const [user, setUser] = useState<userType >(currentUser)
    //const [loading, setLoading] = useState(true)
    
    // useEffect(() => {
    //     fetchData("/currentUser")
    //     .then(data => {
    //       setLoading(false)
    //       if (!Array.isArray(data)) setUser(data)
    //     })
    //     .catch(err => console.log(err))
    // },[])

   // if(loading) return (<p>loading...</p>)
    //if (!user) return (<p> something went wrong </p>)
  return (
    <userContext.Provider value={{user}} >
        {children}
    </userContext.Provider>
  )
}
