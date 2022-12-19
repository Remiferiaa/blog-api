import React, { useEffect, useState } from "react"


interface IAuth {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = React.createContext<IAuth>({
    auth: false,
    setAuth: () => {}
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [])

    const methods = {
        auth,
        setAuth
    }

    return (
        <AuthContext.Provider value={methods}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

