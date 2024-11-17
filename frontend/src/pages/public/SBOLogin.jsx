import { useState } from 'react';
import '../styles/sbo-login.scss';

export default function SBOLogin() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    return (
        <div className='sbl-m-container'>
            <div className='sbl-sbo-logo-container'>
                <p>logo</p>
            </div>
            <div className='sbl-sbo-login-container'>
                <form action='#' className='sbl-sbo-login-form'>
                    <h2>Welcome back, SBO members!</h2>
                    <p>Let's make this event a success together</p>
                    <h3>Login</h3>
                    <div className='sbl-email sbl-input-wrapper'>
                        <label>Email</label>
                            <input
                                type='email'
                                placeholder=''
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='sbl-email-field'
                                required
                            />
                    </div>

                    <div className='sbl-password sbl-input-wrapper'>
                        <label>Password</label>
                            <input
                                type='password'
                                placeholder=''
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='sbl-password-field'
                                required
                            />
                    </div>

                    <div className='sbl-option-wrapper'>
                        <div className='sbl-remember-me'>
                            <input type="checkbox" className="sbl-check-box"/>
                            <label>Remember me</label> 
                        </div>
                        <a href="#" className='sbl-forgot-password'>Forgot Password?</a>
                    </div>

                    <div className='sbl-button-wrapper'>
                        <button className='sbl-login'>Login</button>
                        <a href='#' className='sbl-help'>Need help?</a>

                        <p className='sbl-separator'><span>or</span></p>

                        <button className='sbl-google-login'>Login with Google</button>
                    </div>
                </form>
            </div>
        </div>
    )
}