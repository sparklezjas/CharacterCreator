import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import enter from '../images/buttons/enter.png'
import loginWelcome from '../images/keyboardLogin.png'
import loginScroll from '../images/loginScroll.png'
import '../CSS/Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div>
            <img className='loginGraphics' src={loginWelcome} alt="welcome login screen" />
        
        <form className="login" onSubmit={handleSubmit}>

        <div className="regContainer">
        <img className='scrollGraphics' src={loginScroll} alt="welcome login screen" />
            <input
                className="signupEmail2 signupFields"
                type="email"
                placeholder="..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <input
                className="signupPassword2 signupFields"
                type="password"
                placeholder="..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br />

            <button disabled={isLoading}
            className="enterButton enterButton2"
            style={{backgroundImage:`url(${enter})`}}
            ></button> {error && <div className="error">{error}</div>}
        </div>
        </form>
        </div>
    )
}

export default Login