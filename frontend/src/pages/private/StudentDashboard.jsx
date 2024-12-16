import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-dashboard.scss';
import StudentEvent from '../../components/studentDashboard/StudentEvent';
import StudentDiscover from '../../components/studentDashboard/StudentDiscover';
import { decodeToken } from '../../utils/auth';
import StudentHome from '../../components/studentDashboard/StudentHome';
import getStudent from '../../services/studentServices/getStudent';
import {userContext} from '../../main';
import StudentSettings from '../../components/studentDashboard/StudentSettings';
import defaultIcon from '../../assets/pfp.png'
import getSbo from '../../services/sboServices/getSbo';
import { getEventById } from '../../services/eventServices/getEvent';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken'))
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('default');
    const [isLoading, setIsLoading] = useState(true);
    const [userIcon, setUserIcon] = useState();
    const [events, setEvents] = useState([]);
    const [sboId, setSboId] = useState('');
    const {user,setUser} = useContext(userContext);

    const homeClick = () =>{
        setIsActive('default');
    }
    const eventClick = () =>{
        setIsActive('myevent');
    }
    const discoveryClick = () =>{
        setIsActive('discovery');
    }
    const settingsClick = () =>{
        setIsActive('settings');
    }


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
        const fetchStudentData = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const urlToken = params.get('usertoken');
                const token = urlToken || userToken;
    
                if (!token) {
                    navigate('/studentlogin');
                    return;
                }
                setUserIcon(defaultIcon);
                const studentId = decodeToken(token)?.userObj;
                
                if (studentId) {
                    const userData = await getStudent.getStudentById(token, studentId);
                    setUser(userData.data);
                    const sId = await getSbo.getSboId(userToken, userData.data.sbo_name);
                    const sEvent = await getEventById(userToken, sId.sbo_id);
                    setEvents(sEvent);
                    localStorage.setItem('userToken', token);
                }
    
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                navigate('/studentlogin');
            }
        };
    
        fetchStudentData();
    }, [userToken, navigate, setUser]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        >   
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
                            <span className="sb-pimg" style={{
                                backgroundImage: `url(${userIcon})`,
                            }}></span>
                            <span className={`sb-parrow ${dropdownVisible ? 'arrow-up' : 'arrow-down'}`}></span>
                        </div>
                        {dropdownVisible && (
                            <div className="sb-dropdown">
                                <ul>
                                    <li onClick={settingsClick}>Settings</li>
                                    <li onClick={onLogOut}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            {isActive === 'default' ? (
                <StudentHome user={user} discoveryClick={discoveryClick} eventClick={eventClick}/>
            ) : isActive === 'discovery' ? (
                <StudentDiscover isActive={isActive} discoveryClick={discoveryClick} eventclick={eventClick} events={events} user={user} userToken={userToken}/>
            ): isActive ==='myevent'?(
                <StudentEvent isActive={isActive} discoveryClick={discoveryClick} eventclick={eventClick}/>
            ): isActive === 'settings'?(
                <StudentSettings userIcon={userIcon} user={user}/>
            ):(
                <div>Error</div>
            )}

            {isActive === 'settings' ? (
                <footer className='sb-sfooter'></footer>
            ):(
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
            )}
        </div>
        </motion.div>
    );
}
