import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/error-page.scss';

export default function ErrorProfile() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="error-page">
            <div className="error-content">
                <h1>404</h1>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <button className="error-button" onClick={handleGoBack}>
                    Go Back
                </button>
            </div>
        </div>
    );
}
