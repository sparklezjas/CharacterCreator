import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from 'react-router-dom'
import loginB from '../images/buttons/login.png'
import registerB from '../images/buttons/register.png'
import signupB from '../images/buttons/signup.png'
import enter from '../images/buttons/enter.png'
import signupWelcome from '../images/keyboardSignup.png'
import signupScroll from '../images/signupScroll.png'

import '../CSS/Login.css'


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(name, email, password);
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
