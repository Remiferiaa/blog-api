import React, { useState } from 'react'
import useCms from '../../Hook/useCms'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'

interface resErr {
    error: number,
    message: string
}

const Login = () => {
    const navigate = useNavigate()
    const { login } = useCms()
    const [user, setUser] = useState('')
    const [pw, setPw] = useState('')
    const [err, setErr] = useState<resErr>()

    async function submit(e: React.FormEvent) {
        try {
            e.preventDefault()
            const response = await login(user, pw)
            const content = await JSON.parse(JSON.stringify(response.data))
            localStorage.setItem('token', content.token)
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr(err.response?.data)
            } else {
                console.error(err)
            }
        }
    }

    return (
        <div className='cms-container'>
            <form onSubmit={(e) => submit(e)} className='login-form'>
                <label htmlFor="username">Name:</label>
                <input type='text' id='username' name='username' required autoComplete='off' value={user} onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="password">Comment:</label>
                <input type='password' id='password' name='password' required autoComplete='off' value={pw} onChange={(e) => setPw(e.target.value)} />
                {err ? <p>{err.message}</p> : <></>}
                <button className='login-btn'>Post</button>
            </form>
        </div>
    )
}

export default Login