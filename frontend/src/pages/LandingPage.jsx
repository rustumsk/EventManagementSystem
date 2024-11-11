import { useState, useEffect } from 'react';
import '../styles/landing.scss';
import { Navigate, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleMouseClick = () => setIsDropdownOpen(!isDropdownOpen);
  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);
  const handleStudentLoginClick = () => navigate('/StudentLogin');
  const handleSignup = () => navigate('/Signup');


  return (
    <div className="lp-l-container">
      <section className="lp-sec lp-first">
        <header className="lp-f-header">
          <section className="lp-head-container">
            <section className="lp-info-container">
              <div className="lp-logo">
                <span>Logo</span>
              </div>
              <div className="lp-infos">
                <div className="lp-contact"><span>Contact Us</span></div>
                <div className="lp-policy"><span>Privacy Policy</span></div>
                <div className="lp-terms"><span>Terms of service</span></div>
                <div className="lp-faq"><span>FAQ</span></div>
              </div>
            </section>
            <section className="lp-btns-container">
              <div className="lp-btns">
                <div className="lp-login-container">
                  <button className="lp-login" onClick={handleMouseClick}>
                    Login
                    <span className={`lp-arrow ${isDropdownOpen ? 'lp-open' : ''}`}></span>
                  </button>
                  {isDropdownOpen && (
                    <ul className="lp-dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <li className="lp-dropdown-item" onClick={handleStudentLoginClick}>Student</li>
                      <li className="lp-dropdown-item">SBO</li>
                    </ul>
                  )}
                </div>
                <button className="lp-register">Register</button>
              </div>
            </section>
          </section>
        </header>
        <section className="lp-f-body">
          <section className="lp-l-sec">
            <section className="lp-l-cont">
              <div className="lp-up">
                <p>{texts[3]}</p>
              </div>
              <div className="lp-down">
                <section className="lp-d-cont">
                  <div className="lp-arr" onClick={handleSignup}></div>
                  <div className="lp-tx">
                    <span>{texts[0]}</span>
                    <span>{texts[1]}</span>
                  </div>
                </section>
              </div>
            </section>
          </section>
          <section className="lp-r-sec">
            <div className="lp-r-cont">
              <div className="lp-t-cont">
                <div className="lp-ps">
                  <p>{texts[2]}</p>
                </div>
                <div className="lp-a-l">
                  <section className="lp-d-cont1">
                    <div className="lp-d-txt">
                      <span>{texts[4]}</span>
                      <span>{texts[5]}</span>
                    </div>
                    <div className="lp-d-arr">
                      <span></span>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <section className="lp-sec lp-second">
        <section className='lp-sl'></section>
        <section className='lp-sr'>
          <section className='lp-t-con'>
            <p className='lp-s'>For Students</p>
            <p className='lp-n'>{texts[6]}</p>
            <p className='lp-p'>{texts[7]}</p>
            <p className='lp-p'>{texts[8]}</p>
            <p className='lp-p'>{texts[9]}</p>
          </section>
        </section>
      </section>
      <section className="lp-sec lp-third">
        <section className='lp-sl'>
          <section className='lp-t-con'>
            <p className='lp-s'>For SBOs</p>
            <p className='lp-n'>{texts[10]}</p>
            <p className='lp-p'>{texts[11]}</p>
            <p className='lp-p'>{texts[12]}</p>
            <p className='lp-p'>{texts[13]}</p>
          </section>
        </section>
        <section className='lp-sr'></section>
      </section>
      <section className="lp-sec lp-fourth">
        <div className="lp-fcont">
          <section className='lp-ls'>
          </section>
          <section className='lp-rs'></section>
        </div>
      </section>
      <section className="lp-sec lp-fifth"></section>
    </div>
  );
}