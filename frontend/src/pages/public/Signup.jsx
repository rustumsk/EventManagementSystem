import React, { useState } from "react";
import "../../styles/signup.scss";
import logo from "../../assets/logo.png";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createLocalStudent } from "../../services/studentServices/studentCreation";
import googleLogo from "../../assets/gg.png";
import appImage from "../../assets/SBOD_Logos/logo.png";
import suDesign from "../../assets/su-design.png";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const [signupName, setName] = useState("");
  const [signupIdno, setIdno] = useState("");
  const [signupEmad, setEmad] = useState("");
  const [signupPass, setPass] = useState("");
  const [signupConfirmpass, setConfirmPass] = useState("");
  const [signupErrors, signupSetErrors] = useState({});
  const navigate = useNavigate();

  const handleLoginClick = () => {
    alert("Hi pre");
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const authentication = async (e) => {
    e.preventDefault(); 

    signupSetErrors({}); // Reset errors

    const newErrors = {}; // Validation checks

    if (!signupName) newErrors.signupName = "Full Name is required!";
    if (!signupIdno) {
        newErrors.signupIdno = "ID Number is required!";
    } else if (!/^\d{8}$/.test(signupIdno)) {
        newErrors.signupIdno = "ID Number must be exactly 8 digits!";
    }
    if (!signupEmad) {
        newErrors.signupEmad = "Email Address is required!";
    } else if (!validateEmail(signupEmad)) {
        newErrors.signupEmad = "Please enter a valid email address!";
    }
    if (!signupPass) newErrors.signupPass = "Password is required!";
    if (!signupConfirmpass) newErrors.signupConfirmpass = "Confirm Password is required!";
    if (signupPass !== signupConfirmpass) newErrors.signupConfirmpass = "Passwords do not match!";

    if (Object.keys(newErrors).length > 0) {
        signupSetErrors(newErrors);
        return;
    }

    const data = {
        fullname: signupName,
        id_num: Number(signupIdno),
        email: signupEmad,
        password: signupPass
    };
    
    console.log("Submitting:", data);

    try{
        const result = await createLocalStudent(data.id_num, data.email, data.fullname, data.password);
        console.log(result.data.status);
        toast.success("Sucessfully Signed Up!");
        toast.info("Please Wait For Your Sbo to Approve ur Registration!");
    }catch(e){
        console.log(e);
        toast.error("Student Already Exists!");
    }
};

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === "email" && signupErrors.signupEmad) {
      signupSetErrors(prevErrors => ({ ...prevErrors, signupEmad: "" }));
    }
    if (field === "name") setName(value);
    if (field === "idno") setIdno(value);
    if (field === "email") setEmad(value);
    if (field === "password") setPass(value);
    if (field === "confirmPassword") setConfirmPass(value);
  };

  return (
    <div className="signup-container">  
    <ToastContainer />
      <section className="signup-design-container">
        <section className="signup-logo-container">
          <img className="signup-logo" src={appImage} />
        </section>
        <section className="signup-design-human-container">
          <img className="signup-design-human" src={suDesign} />
        </section>
      </section>

      <section className="signup-sidebar-design"></section>

      <section className="signup-main-container">
        <h2 style={{ fontFamily: "Righteous" }}>STUDENT ACCOUNT</h2>
        <section className="signup-details">
          <section className="signup-personal">
            <p className="signup-p-design">Personal Details</p>
            <p className="signup-p-label">Full Name</p>
            <input 
              type="text" 
              placeholder="enter your full name" 
              className="signup-input-style" 
              value={signupName}
              onChange={(e) => handleInputChange(e, "name")}
            />
            {signupErrors.signupName && <p className="error-message">{signupErrors.signupName}</p>}
            <p className="signup-p-label">ID Number</p>
            <input 
              type="text" 
              placeholder="enter your ID number" 
              className="signup-input-style" 
              value={signupIdno}
              onChange={(e) => handleInputChange(e, "idno")}
            />
            {signupErrors.signupIdno && <p className="error-message">{signupErrors.signupIdno}</p>}
            <p className="signup-p-label">Email Address</p>
            <input 
              type="text" 
              placeholder="johndoe@gmail.com" 
              className="signup-input-style" 
              value={signupEmad}
              onChange={(e) => handleInputChange(e, "email")}
            />
            {signupErrors.signupEmad && <p className="error-message">{signupErrors.signupEmad}</p>}
          </section>
          <section className="signup-password">
            <p className="signup-p-design">Password Details</p>
            <p className="signup-p-label">Password</p>
            <input 
              type="password" 
              placeholder="enter your password" 
              className="signup-input-style" 
              value={signupPass}
              onChange={(e) => handleInputChange(e, "password")}
            />
            {signupErrors.signupPass && <p className="error-message">{signupErrors.signupPass}</p>}
            <p className="signup-p-label">Confirm Password</p>
            <input 
              type="password" 
              placeholder="confirm password" 
              className="signup-input-style" 
              value={signupConfirmpass}
              onChange={(e) => handleInputChange(e, "confirmPassword")}
            />
            {signupErrors.signupConfirmpass && <p className="error-message">{signupErrors.signupConfirmpass}</p>}
          </section>
          <section className="signup-btns-container">
            <button className="signup-register-btn" onClick={authentication}>Register</button>
            <button className="signup-google-btn" onClick={() => window.location.href = "http://localhost:3000/google"}>
              <img 
                src={googleLogo} 
                className="google-logo"
              />Sign up with Google</button>
            <p> Already have an account?{' '}
              <span onClick={() => window.location.href = "http://localhost:5173/studentlogin"} style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }} >
                Login
              </span>
            </p>
          </section>
        </section>
      </section>
    </div>
  );
}

export default Signup;
