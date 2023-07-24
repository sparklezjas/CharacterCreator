import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import '../CSS/Navbar.css'

import login from '../images/buttons/login.png'
import logoutB from '../images/buttons/logout.png'
import register from '../images/buttons/register.png'
import woodHeader from '../images/header-bar.png'
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
            style={{backgroundImage:`url(${woodHeader})`, height:"80px"}}
            >

                <Link to="/">
                    <h1 style={{color:"black", marginLeft:"20px"}}></h1>
                </Link>
                <nav style={{display:"flex"}}>
                    {user && (
                        <div>
                            <span className='userInfo'>
                            Hello, {user.email}!</span>
                        </div>
                         )}

                        <div>
                        <button className='authButtons logoutBtn' type='button'
                            style={{backgroundImage:`url(${logoutB})`}}
                            onClick={handleClick}/>
                        </div>
                   
                    {!user && (
                        <div >
                          

                            {/* <Link to="/login">
                                <button className='authButtons logoutBtn' type='button'
                                style={{backgroundImage:`url(${logoutB})`}}
                                onClick={handleClick}/>
                            </Link> */}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar