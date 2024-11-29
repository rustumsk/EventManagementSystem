import React, { useState } from 'react';
import '../../styles/email-verification.scss';

export default function EmailVerification() {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const email = "johndoe@gmail.com";

    const handleInputChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleVerify = () => {
        const otpCode = otp.join('');
        console.log('Entered OTP:', otpCode); 
    };

    return (
        <div className="email-verification-container">
            <div className="verification-card">
                <div className="icon-placeholder">
                    <div className="checkmark"></div>
                </div>
                <h2>Verify Your Email Address</h2>
                <p>We have sent a verification code to <strong>{email}</strong></p>
                <p>Please check your inbox and enter the verification code below to verify your email address. The code will expire in 10 minutes.</p>
                <div className="otp-inputs">
                    {otp.map((data, index) => (
                        <input
                            type="text"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleInputChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>
                <button onClick={handleVerify}>Verify</button>
                <a href="#" className="resend-link">Resend</a>
            </div>
        </div>
    );
}
