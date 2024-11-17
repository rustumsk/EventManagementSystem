import { useState } from 'react';
import '../styles/student-login.scss';

export default function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Google Login Handler
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    };

    // Facebook Login Handler
    const handleFacebookLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/facebook`;
    };

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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='password-field'
                            required
                        />
                    </div>

                    <div className='option-wrapper'>
                        <div className='remember-me'>
                            <input type="checkbox" className="check-box" />
                            <label>Remember me</label>
                        </div>
                        <a href="#" className='forgot-password'>Forgot Password?</a>
                    </div>

                    <div className='button-wrapper'>
                        <button type='submit' className='login'>Login</button>
                        <a href='#' className='help'>Need help?</a>

                        <p className='separator'><span>or</span></p>

                        <button className='google-login' onClick={handleGoogleLogin}>
                            Login with Google
                        </button>
                        <button className='facebook-login' onClick={handleFacebookLogin}>
                            Login with Facebook
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
