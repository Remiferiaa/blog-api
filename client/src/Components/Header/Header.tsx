import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <div className='header-inner'>
                <Link to='/'>
                    Blog
                </Link>
                <Link to='/login'>
                    Admin
                </Link>
            </div>
        </header>
    )
}

export default Header