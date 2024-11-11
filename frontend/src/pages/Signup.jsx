import React, { useState } from "react";
import "../styles/signup.scss";
import logo from "../assets/logo.png";

function Signup() {
  const [signupName, setName] = useState("");
  const [signupIdno, setIdno] = useState("");
  const [signupEmad, setEmad] = useState("");
  const [signupPass, setPass] = useState("");
  const [signupConfirmpass, setConfirmPass] = useState("");
  const [signupErrors, signupSetErrors] = useState({});

  const authentication = (e) => {
    e.preventDefault(); // Prevent page refresh

    signupSetErrors({}); // Reset errors

    const newErrors = {}; // Validation checks

    if (!signupName) newErrors.signupName = "Full Name is required!";
    if (!signupIdno) newErrors.signupIdno = "ID Number is required!";
    if (!signupEmad) newErrors.signupEmad = "Email Address is required!";
    if (!signupPass) newErrors.signupPass = "Password is required!";
    if (!signupConfirmpass) newErrors.signupConfirmpass = "Confirm Password is required!";
    if (signupPass !== signupConfirmpass) newErrors.signupConfirmpass = "Passwords do not match!";

    // If there are any errors, set them in state
    if (Object.keys(newErrors).length > 0) {
      signupSetErrors(newErrors);
      return;
    }

    alert(
      `Full Name: ${signupName}\nID Number: ${signupIdno}\nEmail Address: ${signupEmad}\nPassword: ${signupPass}`,
    );
  };

  return (
    <div className="signup-container">
      <section className="signup-left-container">
        <img src={logo} alt="signup-Logo" className="signup-logo" />
        <section className="signup-right-side" />
      </section>

      <section className="signup-main-container">
        <h1
          style={{
            paddingRight: 200,
            paddingBottom: 15,
            fontSize: 32,
            fontFamily: "Righteous",
          }}
        >
          STUDENT ACCOUNT
        </h1>

        <div className="signup-personal-details">
          <div className="signup-form-group">
            <h3 className="signup-perTails">Personal Details</h3>
            <label htmlFor="signupName">Full Name</label>
            <input // NAME INPUT
              id="signupName"
              className="signupName"
              type="text"
              placeholder={signupErrors.signupName || "enter full name"}
              value={signupName}
              onChange={(e) => setName(e.target.value)}
              style={{ borderColor: signupErrors.signupName ? "red" : "#ccc" }} // Red border if error
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="signupIdno">ID Number</label>
            <input // ID NUMBER INPUT
              id="signupIdno"
              className="signupIdno"
              type="text"
              placeholder={signupErrors.signupIdno || "enter your ID number"}
              value={signupIdno}
              onChange={(e) => setIdno(e.target.value)}
              style={{ borderColor: signupErrors.signupIdno ? "red" : "#ccc" }} // Red border if error
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="signupEmad">Email Address</label>
            <input // EMAIL ADDRESS INPUT
              id="signupEmad"
              className="signupEmad"
              type="email"
              placeholder={signupErrors.signupEmad || "johndoe@gmail.com"}
              value={signupEmad}
              onChange={(e) => setEmad(e.target.value)}
              style={{ borderColor: signupErrors.signupEmad ? "red" : "#ccc" }} // Red border if error
            />
          </div>
        </div>

        <div className="signup-password-details">
          <div className="signup-form-group">
            <h3 className="signup-passText">Password Details</h3>
            <label htmlFor="signupPass">Password</label>
            <input // PASSWORD INPUT
              id="signupPass"
              className="signupPass"
              type="password"
              placeholder={signupErrors.signupPass || "enter your password"}
              value={signupPass}
              onChange={(e) => setPass(e.target.value)}
              style={{ borderColor: signupErrors.signupPass ? "red" : "#ccc" }} // Red border if error
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="signupConfirmpass">Confirm Password</label>
            <input // CONFIRM PASSWORD INPUT
              id="signupConfirmpass"
              className="signupConfirmpass"
              type="password"
              placeholder={
                signupErrors.signupConfirmpass || "confirm your password"
              }
              value={signupConfirmpass}
              onChange={(e) => setConfirmPass(e.target.value)}
              style={{
                borderColor: signupErrors.signupConfirmpass ? "red" : "#ccc",
              }} // Red border if error
            />
          </div>
        </div>

        <button className="signup-register-button" onClick={authentication}>
          <b>Register</b>
        </button>
        <p className="signup-login-text">
          Already have an account?{" "}
          <a href="/StudentLogin">
            <b>Login</b>
          </a>
        </p>
      </section>
    </div>
  );
}

export default Signup;
