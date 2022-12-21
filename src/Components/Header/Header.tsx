import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext'
import { useContext } from 'react'

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        setAuth(false)
        localStorage.clear()
        navigate('/')
    }
    const header1 = () => {
        return (
            <div className='header-inner'>
                <Link to='/'>
                    Blog
                </Link>
                <Link to='/login'>
                    Admin
                </Link>
            </div>
        )
    }

    const header2 = () => {
        return (
            <div className='header-inner'>
                <Link to='/'>
                    Blog
                </Link>
                <div className='header-content'>
                    <Link to='/newpost'>
                        New Post
                    </Link>
                    <button type='button' className='logout-btn' onClick={() => logout()}>Logout</button>
                </div>
            </div>
        )
    }

    return (
        <header className='header'>
            {auth ? header2() : header1()}
        </header>
    )
}

export default Header