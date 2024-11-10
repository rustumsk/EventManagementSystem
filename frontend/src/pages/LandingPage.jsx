import { useState, useEffect } from 'react';
import '../styles/landing.scss';

const texts = [
  "Discover events tailored for you!",
  "Click here to register and stay updated on what's happening on campus.",
  "Empower your organization with tools to plan, manage, and promote your events effectively!",
  "Join us to explore exciting events, connect with your peers, and get involved in campus activities!",
  "Manage your organization’s events with ease.",
  "Click here to streamline your planning and enhance student engagement!",
  "Engage in Campus Life with Ease",
  "Say goodbye to long forms—register in just a few clicks!",
  "Automatic reminders so you never miss an event you’re excited about",
  "Meet new friends, network, and make the most of every event.",
  "Simplify Event Management, Amplify Engagement",
  "Set up and customize events easily with step-by-step guidance.",
  "Get feedback and insights to help improve events and engage your audience.",
  "Build a community by reaching students across campus effectively."
];

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseClick = () => setIsDropdownOpen(!isDropdownOpen);
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
                <div className="login-container">
                  <button className="login" onClick={handleMouseClick}>
                    Login
                    <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}></span>
                  </button>
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
                <p>{texts[3]}</p>
              </div>
              <div className="down">
                <section className="d-cont">
                  <div className="arr"></div>
                  <div className="tx">
                    <span>{texts[0]}</span>
                    <span>{texts[1]}</span>
                  </div>
                </section>
              </div>
            </section>
          </section>
          <section className="r-sec">
            <div className="r-cont">
              <div className="t-cont">
                <div className="ps">
                  <p>{texts[2]}</p>
                </div>
                <div className="a-l">
                  <section className="d-cont1">
                    <div className="d-txt">
                      <span>{texts[4]}</span>
                      <span>{texts[5]}</span>
                    </div>
                    <div className="d-arr">
                      <span></span>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <section className="sec second">
        <section className='sl'></section>
        <section className='sr'>
          <section className='t-con'>
            <p className='s'>For Students</p>
            <p className='n'>{texts[6]}</p>
            <p className='p'>{texts[7]}</p>
            <p className='p'>{texts[8]}</p>
            <p className='p'>{texts[9]}</p>
          </section>
        </section>
      </section>
      <section className="sec third">
        <section className='sl'>
          <section className='t-con'>
            <p className='s'>For SBOs</p>
            <p className='n'>{texts[10]}</p>
            <p className='p'>{texts[11]}</p>
            <p className='p'>{texts[12]}</p>
            <p className='p'>{texts[13]}</p>
          </section>
        </section>
        <section className='sr'></section>
      </section>
      <section className="sec fourth">
        <div className="fcont">
          <section className='ls'>
          </section>
          <section className='rs'></section>
        </div>
      </section>
      <section className="sec fifth"></section>
    </div>
  );
}