import { useState } from 'react';
import '../styles/student-login.scss';

export default function StudentLogin() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    return (
        <div className='m-container'>
            <div className='logo-container'>
                <p>logo</p>
            </div>
            <div className='login-container'>
                <form action='#' className='login-form'>
                    <h2>WELCOME BACK STUDENT!</h2>
                    <p>Don't have an account ? <a href='#' className='register'>Register Now</a></p>
                    <h3>LOGIN</h3>
                    <div className='email input-wrapper'>
                        <label>Email</label>
                            <input
                                type='email'
                                placeholder=''
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='email-field'
                                required
                            />
                    </div>

                    <div className='password input-wrapper'>
                        <label>Password</label>
                            <input
                                type='password'
                                placeholder=''
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='password-field'
                                required
                            />
                    </div>

                    <div className='option-wrapper'>
                        <div className='remember-me'>
                            <input type="checkbox" className="check-box"/>
                            <label>Remember me</label> 
                        </div>
                        <a href="#" className='forgot-password'>Forgot Password?</a>
                    </div>

                    <div className='button-wrapper'>
                        <button className='login'>Login</button>
                        <a href='#' className='help'>Need help?</a>

                        <p className='separator'><span>or</span></p>

                        <button className='google-login'>Login with Google</button>
                    </div>
                </form>
            </div>
        </div>
    )
}