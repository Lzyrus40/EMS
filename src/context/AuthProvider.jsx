import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)
    const [adminData, setAdminData] = useState(null)

    useEffect(() => {
        setLocalStorage()
        const {admin} = getLocalStorage()
        const {employees} = getLocalStorage()
        setUserData(employees)
        setAdminData(admin)
    }, [])
    
    

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData,adminData,setAdminData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider