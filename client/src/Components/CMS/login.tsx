import React, { useState, useContext } from 'react'
import useCms from '../../Hook/useCms'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/authContext'


const Login = () => {
    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const { login } = useCms()
    const [user, setUser] = useState('')
    const [pw, setPw] = useState('')
    const [err, setErr] = useState('')

    async function submit(e: React.FormEvent) {
        try {
            e.preventDefault()
            const response = await login(user, pw)
            const content = await JSON.parse(JSON.stringify(response.data))
            localStorage.setItem('token', content.token)
            setAuth(true)
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr(err.response?.data.message)
                setPw('')
                setUser('')
            } else {
                console.error(err)
            }
        }
    }

    return (
        <div className='cms-post-container'>
            <form onSubmit={(e) => submit(e)} className='login-form'>
                <label htmlFor="username">Username:</label>
                <input type='text' id='username' name='username' required autoComplete='off' value={user} onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type='password' id='password' name='password' required autoComplete='off' value={pw} onChange={(e) => setPw(e.target.value)} />
                {err ? <p className='err-msg'>{err}</p> : <></>}
                <button className='login-btn'>Post</button>
            </form>
        </div>
    )
}

export default Login