import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import '../CSS/Navbar.css'

import login from '../images/buttons/login.png'
import logoutB from '../images/buttons/logout.png'
import register from '../images/buttons/register.png'
import woodBkgd from '../images/woodBkgd.jpg'


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container"
            // style={{backgroundImage:`url(${woodBkgd})`}}
            >

                <Link to="/">
                    <h1 style={{color:"black"}}>THE TYPING TRIALS</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span className='userInfo'>{user.email}</span>
                            <button className='authButtons logoutBtn' type='button'
                                style={{backgroundImage:`url(${logoutB})`}}
                                onClick={handleClick}/>
                        </div>
                    )}
                    {!user && (
                        <div className='authButtons'>
                            <Link to="/login">
                                <button className='authButtons loginBtn' type='button'
                                style={{backgroundImage:`url(${login})`}}/>
                            </Link>

                            <Link to="/signup">
                                <button className='authButtons registerBtn' type='button'
                                style={{backgroundImage:`url(${register})`}}/>
                            </Link>

                            <Link to="/login">
                                <button className='authButtons logoutBtn' type='button'
                                style={{backgroundImage:`url(${logoutB})`}}
                                onClick={handleClick}/>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar