import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../../styles/student-dashboard.scss';
import { userContext } from '../../main';
import { checkStudentAuthorized } from '../../utils/auth';

export default function StudentDashboard() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [verified, setVerified] = useState(false);
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken'))
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('default');
    const featuredEvent = [1, 2, 3, 4, 5, 6];
    const registeredEvent = [1, 2, 3, 4, 5, 6,7,8];
    const containerRef = useRef(null);
    const user = checkStudentAuthorized(userToken);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleMouseEnter = (index) => {
        const targetDiv = containerRef.current.children[index];
        const container = containerRef.current;

        const containerWidth = container.offsetWidth;
        const targetOffsetLeft = targetDiv.offsetLeft;
        const targetWidth = targetDiv.offsetWidth;

        const targetCenter = targetOffsetLeft + targetWidth / 2;
        const scrollLeft = targetCenter - containerWidth / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
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
                                    <li onClick={onLogOut}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            {isActive === 'default' ? (
                <section className="sb-body">
                    <section className='sb-welcome'>
                        <p className='sb-wel'>Welcome <span>{user.userObj.fullname}!</span></p>
                        <p className='sb-kick'>Let’s kickstart the day with some exciting events!</p>
                    </section>
                    <section className='sb-discover'>
                        <button className='sb-ed'><span className='ed-icon'></span> Event Discovery</button>
                        <button className='sb-me'><span className='me-icon'></span> My Events</button>
                    </section>
                    <section className='sb-featured'>
                        <p className='sb-fe'>Featured Events</p>
                        <section className='sb-fm' ref={containerRef}>
                            {featuredEvent.map((item, index) => (
                                <div 
                                    onMouseEnter={() => handleMouseEnter(index)}
                                >
                                </div>
                            ))}
                        </section>
                    </section>
                    <section className='sb-uregistered'>
                        <header className='sb-uheader'>
                            <span className='sb-re'>Upcoming Registered Events</span>
                            <div className='sb-va'>
                                <button >View All</button>
                            </div>
                        </header>
                        <section className='sb-ur-cont'>
                            {registeredEvent.map((item, index) => (
                                <div 
                                    onMouseEnter={() => handleMouseEnter(index)}
                                >
                                </div>
                            ))}
                        </section>  
                    </section>
                    <section className='small-footer'></section>
                </section>
            ) : (
                <div> Error or Invalid Page </div>
            )}
            <footer className="sb-footer"></footer>
        </div>
    );
}
