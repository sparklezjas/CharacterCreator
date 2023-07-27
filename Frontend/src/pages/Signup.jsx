import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from 'react-router-dom'
import enter from '../images/buttons/enter.png'
import signupWelcome from '../images/keyboardSignup.png'
import signupScroll from '../images/signupScroll.png'

import '../CSS/Login.css'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const { signup, isLoading } = useSignup();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("HALT! All fields are required.")
            return
        }
        await signup(name, email, password)
        if (error) {
            return
        }
        navigate('/characters/all')
    };

    return (
        <div>

            <div>
                <img className='loginGraphics' src={signupWelcome} alt="welcome login screen" />
            </div>
            <form className="signup" onSubmit={handleSubmit}>
            

            <div className="regContainer">
                <img className='scrollGraphics' src={signupScroll} alt="welcome sign up screen" />
                    <input
                        className="signupName signupFields"
                        type="name"
                        placeholder="..."
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <br/>
                    <input
                        className="signupEmail signupFields"
                        type="email"
                        placeholder="..."
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <br />
                    <input
                        className="signupPassword signupFields"
                        type="password"
                        placeholder="..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <br />

                    <button disabled={isLoading}
                        className="enterButton"
                        style={{backgroundImage:`url(${enter})`}}
                    ></button> {error && <div className="error signup-error">{error}
                    </div>}
                </div>
            </form>
        </div>
    );
};

export default Signup;