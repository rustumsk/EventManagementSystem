import { useState } from 'react';
import '../styles/landing.scss';

const text1 = "Discover events tailored for you!";
const text2 = "Click here to register and stay updated on what's happening on campus.";
const text3 = "Empower your organization with tools to plan, manage, and promote your events effectively!";

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  return (
    <div className="l-container">
      <section className="sec first">
        <header className="f-header">
          <section className="head-container">
            <section className="info-container">
              <div className="logo">
                <span>Logo</span>
              </div>
              <div className="infos">
                <div className="contact"><span>Contact Us</span></div>
                <div className="policy"><span>Privacy Policy</span></div>
                <div className="terms"><span>Terms of service</span></div>
                <div className="faq"><span>FAQ</span></div>
              </div>
            </section>
            <section className="btns-container">
              <div className="btns">
                <div 
                  className="login-container" 
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="login">Login</button>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <li className="dropdown-item">Student</li>
                      <li className="dropdown-item">SBO</li>
                    </ul>
                  )}
                </div>
                <button className="register">Register</button>
              </div>
            </section>
          </section>
        </header>
        <section className="f-body">
          <section className="l-sec">
            <section className="l-cont">
              <div className="up">
                <p>Join us to explore exciting events, connect with your peers, and get involved in campus activities!</p>
              </div>
              <div className="down">
                <section className="d-cont">
                  <div className="arr"></div>
                  <div className="tx">
                    <span>{text1}</span>
                    <span>{text2}</span>
                  </div>
                </section>
              </div>
            </section>
          </section>
          <section className="r-sec">
            <div className="r-cont">
              <div className="t-cont">
                <div className="ps">
                  <p>{text3}</p>
                </div>
                <div className="a-l"></div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <section className="sec second"></section>
      <section className="sec third"></section>
      <section className="sec fourth"></section>
      <section className="sec fifth"></section>
    </div>
  );
}
