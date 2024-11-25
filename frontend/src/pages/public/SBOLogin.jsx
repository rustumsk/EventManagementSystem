import { FaGoogle, FaFacebook } from 'react-icons/fa';
import '../../styles/student-login.scss';
import { useState } from 'react';

export default function StudentLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="sl-container">
            <section className="sl-lsection sb-lsection">
                <header className="sl-logo">
                    <span className="sl-l"></span>
                </header>
                <section className="sl-bigimg sb-bigimg"></section>
            </section>
            <section className="sl-rsection">
                <div className="sl-rsection-container">
                    <section className="sl-rheader">
                        <header className="sl-welcome sl-sbowel">Welcome back, SBO member! </header>
                        <span className="sl-reg">
                        Let's make this event a success together.
                        </span>
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
                        />

                        <label htmlFor="sl-pass" className="sl-pass-label">
                            Password
                        </label>
                        <div className="sl-password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="sl-pass"
                                placeholder="*********"
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
                            <button className="sl-log-btn">Login</button>
                            <p>Need Help?</p>
                        </div>
                        <div className="sl-or">or</div>
                        <div className="sl-socials">
                            <button className="sl-google">
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
