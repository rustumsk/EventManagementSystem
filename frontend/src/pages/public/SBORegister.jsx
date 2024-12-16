import React, { useState } from "react";
import "../../styles/sboregister.scss";
import logo from "../../assets/logo.png";
import "toastify-js/src/toastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createLocalStudent } from "../../services/studentServices/studentCreation";
import googleLogo from "../../assets/gg.png";
import appImage from "../../assets/SBOD_Logos/logo.png";
import sboRegisterDesign from "../../assets/sbor-design.png";
import { createSbo } from "../../services/sboServices/createSbo";

function SBORegister() {
  const [sboName, setSboName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigate();
  const validatePhoneNumber = (phone) => /^[0-9]{11}$/.test(phone);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6; 

  const handleRegister = async(e) => {
    e.preventDefault();

    if (!sboName) {
      toast.error("SBO Name is required.");
      return;
    }

    if (!validatePhoneNumber(contactNumber)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try{
      const result = await createSbo(email,sboName,password, contactNumber);
      if(result){
        console.log(result);
        toast.success("Registration Success!");
        toast.info("Still Subject for Approval");
      }
    }catch(e){
      console.log(e);
      toast.error("Invalid Credentials or SBO Already Exists!");
    }
    console.log("Registration successful!");
  };

  return (
    <div className="sboregister-container">  
      <ToastContainer />
      <section className="sboregister-design-container">
        <section className="sboregister-logo-container">
          <img className="sboregister-logo" src={appImage} alt="App Logo"/>
        </section>
        <section className="sboregister-design-human-container">
          <img className="sboregister-design-human" src={sboRegisterDesign} alt="Design"/>
        </section>
      </section>

      <section className="sboregister-sidebar-design"></section>

      {/*Main Content*/}
      <section className="sboregister-main-container">
        <h2 style={{ fontFamily: "Righteous" }}>SBO ACCOUNT</h2>
        <section className="sboregister-details">
          <section className="sboregister-personal">
            <p className="sboregister-p-design">Personal Details</p>
            <p className="sboregister-p-label">SBO Name</p>
            <input
              type="text"
              placeholder="ex. CSPS"
              className="sboregister-input-style"
              value={sboName}
              onChange={(e) => setSboName(e.target.value)}
            />
            <p className="sboregister-p-label">Contact Number</p>
            <input
              type="tel"
              placeholder="091231232"
              className="sboregister-input-style"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <p className="sboregister-p-label">Email Address</p>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="sboregister-input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section className="sboregister-password">
            <p className="sboregister-p-design">Password Details</p>
            <p className="sboregister-p-label">Password</p>
            <input
              type="password"
              placeholder="enter your password"
              className="sboregister-input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="sboregister-p-label">Confirm Password</p>
            <input
              type="text"
              placeholder="confirm password"
              className="sboregister-input-style"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </section>
          <section className="sboregister-btns-container">
            <button className="sboregister-register-btn" onClick={handleRegister}>Register</button>
            <p> Already have an account?{' '}
              <span onClick={() =>{navigation('/sbologin')}} style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }} >
                Login
              </span>
            </p>
          </section>
        </section>
      </section>
    </div>
  );
}

export default SBORegister;
