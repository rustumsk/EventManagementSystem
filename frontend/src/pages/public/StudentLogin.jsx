import { FaGoogle, FaFacebook } from 'react-icons/fa';
import '../../styles/student-login.scss';
import { userContext } from '../../main';
import { useState, useContext, useEffect } from 'react';
import { studentLogin } from '../../services/authServices/studentLogin';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function StudentLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [emailOrId, setEmailOrId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {setUser, user} = useContext(userContext);
    const navigate = useNavigate();
    const userToken = localStorage.getItem('userToken');
    

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const googleRedirect = () =>{
        window.location.href = 'http://localhost:3000/google';
    }
    const validateInput = () => {
        const idRegex = /^\d{8}$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (idRegex.test(emailOrId) || emailRegex.test(emailOrId)) {
            setErrorMessage('');
            return true;
        } else {
            setErrorMessage('Please enter a valid email or 8-digit ID number.');
            return false;
        }
    };

    const handleLogin = async () => {
        if (validateInput()) {
            const isId = /^\d{8}$/.test(emailOrId); 
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrId); 
    
            if (!isId && !isEmail) {
                setErrorMessage('Please enter a valid email or ID.');
                return;
            }
    
            try {
                const result = await studentLogin(password, isId ? emailOrId : 0, isEmail ? emailOrId : "");
                console.log("Login successful:", result.data);
                console.log(result.data);
                localStorage.setItem('userToken', result.data.token);
                navigate('/studentdashboard');

            } catch (error) {
                setErrorMessage('Login failed. Please try again.');
                toast.info(error)
                console.error("Error during login:", error);
            }
        }
    };

    const clearError = () => {
        setErrorMessage('');
    };
    useEffect(() =>{
        // if (userToken){
        //     navigate('/studentdashboard');
        // }
    })
    return (
        <div className="sl-container">
            <ToastContainer />
            <section className="sl-lsection">
                <header className="sl-logo">
                    <span className="sl-l"></span>
                </header>
                <section className="sl-bigimg"></section>
            </section>
            <section className="sl-rsection">
                <div className="sl-rsection-container">
                    <section className="sl-rheader">
                        <header className="sl-welcome">Welcome Back Student!</header>
                        <span className="sl-reg">
                            Don't have an account? <a href="">Register Now!</a>
                        </span>
                        <p className="sb-login">LOGIN</p>
                    </section>
                    <section className="sl-rinput">
                        <label htmlFor="sl-eid" className="sl-eid-label">
                            Email or ID
                        </label>
                        <input
                            type="text"
                            id="sl-eid"
                            placeholder="unijam@gmail.com or 22631439"
                            value={emailOrId}
                            onChange={(e) => setEmailOrId(e.target.value)}
                            onFocus={clearError} // Clears error on focus
                        />
                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <label htmlFor="sl-pass" className="sl-pass-label">
                            Password
                        </label>
                        <div className="sl-password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="sl-pass"
                                placeholder="*********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={clearError} // Clears error on focus
                            />
                            <span
                                className="sl-eye"
                                onClick={togglePasswordVisibility}
                                title={showPassword ? 'Hide Password' : 'Show Password'}
                            >
                                {showPassword ? '👁️' : '🙈'}
                            </span>
                        </div>

                        <a href="">
                            <span>Forgot Password?</span>
                        </a>
                    </section>
                    <section className="sl-rbuttons">
                        <div className="sl-log">
                            <button className="sl-log-btn" onClick={handleLogin}>
                                Login
                            </button>
                            <p>Need Help?</p>
                        </div>
                        <div className="sl-or">or</div>
                        <div className="sl-socials">
                            <button className="sl-google" onClick={googleRedirect}>
                                <FaGoogle size={20} style={{ marginRight: '10px' }} />
                                Login with Google
                            </button>
                            <button className="sl-facebook">
                                <FaFacebook size={20} style={{ marginRight: '10px' }} />
                                Login with Facebook
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
