import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../../styles/student-dashboard.scss';
import { userContext } from '../../main';
import StudentEvent from '../../components/studentDashboard/StudentEvent';
import StudentDiscover from '../../components/studentDashboard/StudentDiscover';
import { checkStudentAuthorized } from '../../utils/auth';
import StudentHome from '../../components/studentDashboard/StudentHome';

export default function StudentDashboard() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [verified, setVerified] = useState(false);
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken'))
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('myevent');
    const containerRef = useRef();
    const featuredEvent = [1,2,3,4,5,6];
    const registeredEvent = [1,2,3,4,5,6,7,8];
    const homeClick = () =>{
        setIsActive('default');
    }
    const eventClick = () =>{
        setIsActive('myevent');
    }
    const discoveryClick = () =>{
        setIsActive('discovery');
    }

    const user = checkStudentAuthorized(userToken);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const onLogOut = () =>{
        localStorage.removeItem('userToken');
        setUserToken('');
    }
    if(!userToken){
        navigate('/studentlogin');
    }
    useEffect(() => {
        if (user) {
            setVerified(true);
            console.log(user);
        } else {
            setVerified(false);
            navigate('/error');
        }
    }, [verified]);

    return (
        <div className="sb-container">
            <header className="sb-header">
                <div className="sb-l-container">
                    <span className="sb-m-logo"></span>
                </div>
                <div className="sb-p-container">
                    <div className="sb-hn-container">
                        <span onClick={homeClick} className={`sb-hicon ${isActive ==='default'? 'hicon-b': ''}`} ></span>
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
                                    <li onClick={onLogOut}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            {isActive === 'default' ? (
                <StudentHome user={user} discoveryClick={discoveryClick}/>
            ) : isActive === 'discovery' ? (
                <StudentDiscover isActive={isActive} discoveryClick={discoveryClick} eventclick={eventClick}/>
            ): isActive ==='myevent'?(
                <StudentEvent isActive={isActive} discoveryClick={discoveryClick} eventclick={eventClick}/>
            ):(
                <div>Error</div>
            )}
            <footer className="sb-footer">
                <section className='sb-fcontainer'>
                    <section className='sb-fsocials'>
                        <div className='sb-slogo'>
                            <span></span>
                        </div>
                        <p className= 'sb-sp'>Join, connect, and thrive! Explore what’s happening around campus.</p>
                        <div className='sb-sicons'>
                            <span className='sb-fb' onClick={() => window.location.href= 'https://www.facebook.com/mykelyolo'}></span>
                            <span className='sb-li' onClick={() => window.location.href= 'https://www.linkedin.com/in/michael-eulu-tumanda-a879b324a/?originalSubdomain=ph'}></span>
                            <span className='sb-x'  onClick={() => window.location.href='https://x.com/postbadgaypics?lang=en'}></span>
                            <span className='sb-ins' onClick={() => window.location.href='https://www.instagram.com/lgbt/?hl=en'}></span>
                        </div>
                    </section>
                    <section className='sb-fgen'>
                        <section className="sb-gen">
                            <p className='sb-bold'>Event Policies</p>
                            <p>Code of Conduct</p>
                            <p>Cancellation & Refund Policy</p>
                            <p>Privacy Policy</p>
                        </section>
                        <section className="sb-gen">
                            <p className='sb-bold'>Support</p>
                            <p>Contact Us</p>
                            <p>FAQ</p>
                            <p>Support Form</p>
                        </section>
                        <section className="sb-gen">
                            <p className='sb-bold'>Help Documentation</p>
                            <p>Registration Guide</p>
                            <p>Navigating the Dashboard</p>
                            <p>Troubleshooting Tips</p>
                        </section>
                        <section className="sb-gen">
                            <p className='sb-bold'>Contact Us</p>
                            <p>Office Hours: 9am - 5pm</p>
                            <p>Email: support@example.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </section>
                    </section>
                </section>
            </footer>
        </div>
    );
}
