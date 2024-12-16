import { FaGoogle, FaFacebook } from 'react-icons/fa';
import '../../styles/student-login.scss';
import { useState } from 'react';
import { sboLogin } from '../../services/authServices/sboLogin';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const validateInputs = () => {
        let isValid = true;

        // Validate email
        if (!email.trim()) {
            toast.error('Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Invalid email format.');
            isValid = false;
        }

        // Validate password
        if (!password.trim()) {
            toast.error('Password is required.');
            isValid = false;
        } else if (password.length < 1) {
            toast.error('Password must be at least 1 character.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validateInputs()) {
            console.log('Logging in with:', { email, password });
            try {
                const result = await sboLogin(email, password);
                console.log(result.data.status);
                localStorage.setItem('sboToken', result.data.token);
                navigate('/sbodashboard');
            } catch (e) {
                console.log(e);
                toast.error('Unverified or Invalid Credentials!');
            }
        }
    };

    return (
        <div className="sl-container">
            <ToastContainer />
            <section className="sl-lsection sb-lsection">
                <header className="sl-logo">
                    <span className="sl-l"></span>
                </header>
                <section className="sl-bigimg sb-bigimg"></section>
            </section>
            <section className="sl-rsection">
                <div className="sl-rsection-container">
                    <section className="sl-rheader">
                        <header className="sl-welcome sl-sbowel">Welcome back, SBO member!</header>
                        <span className="sl-reg">Let's make this event a success together.</span>
                        <p className="sb-login">LOGIN</p>
                    </section>
                    <section className="sl-rinput">
                        <label htmlFor="sl-eid" className="sl-eid-label">
                            Email
                        </label>
                        <input
                            type="text"
                            id="sl-eid"
                            placeholder="unijam@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

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
                            <button className="sl-log-btn" onClick={handleSubmit}>
                                Login
                            </button>
                            <p>Need Help?</p>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
