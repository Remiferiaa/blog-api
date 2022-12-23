import React, { useEffect, useState } from "react"

interface IAuth {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const baseURL = process.env.REACT_APP_URL



export const AuthContext = React.createContext<IAuth>({
    auth: false,
    setAuth: () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(false)
    useEffect(() => {
        const verify = async () => {
            if(localStorage.getItem('token')) {
                const res = await fetch(`${baseURL}/verify`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (res.status !== 200) {
                    setAuth(false)
                    localStorage.clear()
                } else {
                    setAuth(true)
                }
            }
        }
        verify()
    }, [])

    const methods = {
        auth,
        setAuth,
    }

    return (
        <AuthContext.Provider value={methods}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

