import React, { useState } from 'react';
import '../styles/signup.scss';
import logo from '../assets/logo.png';

function Signup() {
    // State variables for form fields
    const [name, setName] = useState('');
    const [idno, setIdno] = useState('');
    const [emad, setEmad] = useState('');
    const [pass, setPass] = useState('');
    const [confirmpass, setConfirmPass] = useState('');
    const [errors, setErrors] = useState({});

    const authentication = (e) => {
        e.preventDefault(); // Prevent page refresh

        setErrors({}); // Reset errors

        const newErrors = {}; // Validation checks

        if (!name) newErrors.name = "Full Name is required!";
        if (!idno) newErrors.idno = "ID Number is required!";
        if (!emad) newErrors.emad = "Email Address is required!";
        if (!pass) newErrors.pass = "Password is required!";
        if (!confirmpass) newErrors.confirmpass = "Confirm Password is required!";
        if (pass !== confirmpass) newErrors.confirmpass = "Passwords do not match!";

        // If there are any errors, set them in state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        alert(`\nFull Name: ${name}\nID Number: ${idno}\nEmail Address: ${emad}\nPassword: ${pass}`);
    };

    return (
        <div className="container">
            <section className="left-container">
                <img src={logo} alt="Logo" className="logo" />
                <section className="right-side" />
            </section>

            <section className="main-container">
                <h1 style={{
                    paddingRight: 200,
                    paddingBottom: 15,
                    fontSize: 32
                }}>STUDENT ACCOUNT</h1>

                <div className="personal-details">
                    <div className="form-group">
                        <h3 className="perTails">Personal Details</h3>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            className="name"
                            type="text"
                            placeholder={errors.name || "Enter full name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ borderColor: errors.name ? 'red' : '#ccc' }} // Red border if error
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idno">ID Number</label>
                        <input
                            id="idno"
                            className="idno"
                            type="text"
                            placeholder={errors.idno || "Enter your ID number"}
                            value={idno}
                            onChange={(e) => setIdno(e.target.value)}
                            style={{ borderColor: errors.idno ? 'red' : '#ccc' }} // Red border if error
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="emad">Email Address</label>
                        <input
                            id="emad"
                            className="emad"
                            type="email"
                            placeholder={errors.emad || "johndoe@gmail.com"}
                            value={emad}
                            onChange={(e) => setEmad(e.target.value)}
                            style={{ borderColor: errors.emad ? 'red' : '#ccc' }} // Red border if error
                        />
                    </div>
                </div>

                <div className="password-details">
                    <div className="form-group">
                        <h3 className="passText">Password</h3>
                        <label htmlFor="pass">Password</label>
                        <input
                            id="pass"
                            className="pass"
                            type="password"
                            placeholder={errors.pass || "Enter your password"}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            style={{ borderColor: errors.pass ? 'red' : '#ccc' }} // Red border if error
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmpass">Confirm Password</label>
                        <input
                            id="confirmpass"
                            className="confirmpass"
                            type="password"
                            placeholder={errors.confirmpass || "Confirm your password"}
                            value={confirmpass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            style={{ borderColor: errors.confirmpass ? 'red' : '#ccc' }} // Red border if error
                        />
                    </div>
                </div>

                <button className="register-button" onClick={authentication}>Register</button>
                <p className="login-text">Already have an account? <a href="/login"><b>Login</b></a></p>
            </section>
        </div>
    );
}

export default Signup;
