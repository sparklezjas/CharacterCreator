import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import '../CSS/Navbar.css'
import loginB from '../images/buttons/login.png'
import signupB from '../images/buttons/signup.png'
import logoutB from '../images/buttons/logout.png'
import woodHeader from '../images/header-bar.png'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    

    return (
    <div>
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
                            Hello, {user.email}!
                        </span>

                        <Link to="/login">
                        <button className='authButtons logoutBtn' type='button'
                            style={{backgroundImage:`url(${logoutB})`}}
                            onClick={handleClick}/>
                        </Link>
                        </div>
                            )}

                    {!user && (
                                    <div className='nav-bar-buttons'>
                                    <Link to="/login">
                                        <button className=' registrationButtons loginBtn' type='button'
                                        style={{backgroundImage:`url(${loginB})`}}/>
                                    </Link>
                    
                                    <Link to="/signup">
                                        <button className='registrationButtons registerBtn' type='button'
                                        style={{backgroundImage:`url(${signupB})`}}/>
                                    </Link>
                                </div>  
                    )}
                </nav>
            </div>
        </header>
    </div>
    )
}

export default Navbar