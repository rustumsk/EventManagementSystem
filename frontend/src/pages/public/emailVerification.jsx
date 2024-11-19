import React from 'react';
import '../../styles/email-verification.scss';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

let fullname = '';
let id_number = '';
let password = '';
let email = '';
let google_id = '';

if(token){
    const decoded = jwtDecode(token);
    google_id = decoded.google_id;
    email = decoded.email;
    fullname = decoded.fullname;
    id_number = decoded.id_number;
    password = decoded.password;
}

export default function EmailVerification() {
    return (
        <div className="email-verification-container">
            <div className="verification-card">
                
                <div className="icon-placeholder"></div>
                <h2>Verify Your Email Address</h2>
                <p>We have sent a verification link to <strong>{email}</strong></p>
                <p>
                    Thank you for registering with us. To complete your registration, please verify your email address by clicking the link below:
                </p>
                <a href="https://app/dsd" target="_blank" rel="noopener noreferrer">
                    https://app/dsd
                </a>
                <button>Verify Email Address</button>
            </div>
        </div>
    );
}
