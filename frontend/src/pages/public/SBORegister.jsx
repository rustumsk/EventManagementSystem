import React, { useState } from "react";
import "../../styles/sboregister.scss";
import logo from "../../assets/logo.png";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createLocalStudent } from "../../services/studentServices/studentCreation";
import googleLogo from "../../assets/gg.png";
import appImage from "../../assets/SBOD_Logos/logo.png";
import sboRegisterDesign from "../../assets/sboregister-design.png";

function SBORegister() {
//   const [sboRegisterName, setName] = useState("");
//   const [sboRegisterIdno, setIdno] = useState("");
//   const [sboRegisterEmad, setEmad] = useState("");
//   const [sboRegisterPass, setPass] = useState("");
//   const [sboRegisterConfirmpass, setConfirmPass] = useState("");
//   const [sboRegisterErrors, sboRegisterSetErrors] = useState({});
//   const navigate = useNavigate();

  const handleLoginClick = () => {
    alert("Hi pre")
  }

  const handleRegister =()=> {
    alert("Hi pre")
  }

//  const authentication = async (e) => {
//     e.preventDefault(); 

//     sboRegisterSetErrors({}); // Reset errors

//     const newErrors = {}; // Validation checks

//     if (!sboRegisterName) newErrors.sboRegisterName = "Full Name is required!";
//     if (!sboRegisterIdno) {
//         newErrors.sboRegisterIdno = "ID Number is required!";
//     } else if (!/^\d{8}$/.test(sboRegisterIdno)) {
//         newErrors.sboRegisterIdno = "ID Number must be exactly 8 digits!";
//     }
//     if (!sboRegisterEmad) newErrors.sboRegisterEmad = "Email Address is required!";
//     if (!sboRegisterPass) newErrors.sboRegisterPass = "Password is required!";
//     if (!sboRegisterConfirmpass) newErrors.sboRegisterConfirmpass = "Confirm Password is required!";
//     if (sboRegisterPass !== sboRegisterConfirmpass) newErrors.sboRegisterConfirmpass = "Passwords do not match!";

//     // If there are any errors, set them in state
//     if (Object.keys(newErrors).length > 0) {
//         sboRegisterSetErrors(newErrors);
//         return;
//     }

//     const data = {
//         fullname: sboRegisterName,
//         id_num: Number(sboRegisterIdno),
//         email: sboRegisterEmad,
//         password: sboRegisterPass
//     };
    
//     console.log("Submitting:", data);
    
//     const result = await createLocalStudent(data.id_num, data.email, data.fullname, data.password);
//     console.log(result.data.status);
//     navigate('/studentlogin');
// };

  return (
    <div className="sboregister-container">  
      <section className="sboregister-design-container">
        <section className="sboregister-logo-container">
          <img className="sboregister-logo" src={appImage}/>
        </section>
        <section className="sboregister-design-human-container">
          <img className="sboregister-design-human" src={sboRegisterDesign}/>
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
            <input type="text" placeholder="enter your sbo name" className="sboregister-input-style"/>
            <p className="sboregister-p-label">Contact Number</p>
            <input type="number" placeholder="enter your contact number" className="sboregister-input-style"/>
            <p className="sboregister-p-label">Email Address</p>
            <input type="text" placeholder="johndoe@gmail.com" className="sboregister-input-style"/>
          </section>
          <section className="sboregister-password">
            <p className="sboregister-p-design">Password Details</p>
            <p className="sboregister-p-label">Password</p>
            <input type="password" placeholder="enter your password" className="sboregister-input-style"/>
            <p className="sboregister-p-label">Confirm Password</p>
            <input type="text" placeholder="confirm password" className="sboregister-input-style"/>
          </section>
          <section className="sboregister-btns-container">
            <button className="sboregister-register-btn" onClick={handleRegister}>Register</button>
            <button className="sboregister-google-btn" onClick={() => window.location.href = "http://localhost:3000/google"}>
              <img 
                src={googleLogo} 
                className="google-logo"
            />Sign up with Google</button>
            <p> Already have an account?{' '}
              <span onClick={handleLoginClick} style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }} >
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