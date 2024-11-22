import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-dashboard.scss';

export default function StudentDashboard() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    // const navigate = useNavigate();
    // const isVerified = false;
    // useEffect(() => {
    //     if (!isVerified) {
    //         navigate('/error');
    //     }
    // }, [isVerified]);
    return (
        <div className="sb-container">
            <header className="sb-header">
                <div className="sb-l-container">
                    <span className="sb-m-logo"></span>
                </div>
                <div className="sb-p-container">
                    <div className="sb-hn-container">
                        <span className="sb-hicon"></span>
                        <span className="sb-nicon"></span>
                    </div>
                    <div className="sb-pr-container">
                        <div className="sb-profile" onClick={toggleDropdown}>
                            <span className="sb-pimg"></span>
                            <span className={`sb-parrow ${dropdownVisible ? 'arrow-up' : 'arrow-down'}`}></span>
                        </div>
                        {dropdownVisible && (
                            <div className="sb-dropdown">
                                <ul>
                                    <li>Settings</li>
                                    <li>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <section className="sb-body">
                <section className='sb-welcome'></section>
                <section className='sb-discover'></section>
                <section className='sb-featured'></section>
                <section className='sb-uregistered'></section>
                <section className='small footer'></section>
            </section>
            <footer className="sb-footer"></footer>
        </div>
    );
}
