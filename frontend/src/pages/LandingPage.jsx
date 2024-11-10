import { useState } from 'react';
import '../styles/landing.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
};

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="landing-container">
      <section className="first-section">
        <header className="header">
          <div className="header-content">
            <div className="logo">Logo</div>
            <div className="nav-links">
              <span>Contact Us</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>FAQ</span>
            </div>
            <div className="buttons">
              <button 
                className="login-button" 
                onClick={toggleDropdown}
              >
                Login
                <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}></span>
              </button>
              {isDropdownOpen && (
                <ul 
                  className="dropdown-menu"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <li className="dropdown-item">Student</li>
                  <li className="dropdown-item">SBO</li>
                </ul>
              )}
              <button className="register-button">Register</button>
            </div>
          </div>
        </header>

        <section className="main-content">
          <div className="left-content">
            <p className="main-text">{texts[3]}</p>
            <div className="sub-text">
              <span>{texts[0]}</span>
              <span>{texts[1]}</span>
            </div>
          </div>
          <div className="right-content">
            <p className="highlight-text">{texts[2]}</p>
            <div className="secondary-text">
              <span>{texts[4]}</span>
              <span>{texts[5]}</span>
            </div>
          </div>
        </section>
      </section>

      <section className="second-section">
        <div className="student-content">
          <p className="section-title">For Students</p>
          <p className="section-text">{texts[6]}</p>
          <p className="section-text">{texts[7]}</p>
          <p className="section-text">{texts[8]}</p>
          <p className="section-text">{texts[9]}</p>
        </div>
      </section>

      <section className="third-section">
        <div className="sbo-content">
          <p className="section-title">For SBOs</p>
          <p className="section-text">{texts[10]}</p>
          <p className="section-text">{texts[11]}</p>
          <p className="section-text">{texts[12]}</p>
          <p className="section-text">{texts[13]}</p>
        </div>
      </section>

      <section className="fourth-section">
        <div className="slider-container">
          <Slider {...sliderSettings}>
            <div className="slide">
              <p>214124</p>
              <p>124124</p>
              <p>124124</p>
            </div>
            <div className="slide">
              <p>214124</p>
              <p>214124</p>
              <p>214124</p>
            </div>
            <div className="slide">
              <p>214124</p>
              <p>214124</p>
            </div>
          </Slider>
        </div>
      </section>

      <section className="fifth-section">
        {/* Add content for the fifth section here if needed */}
      </section>
    </div>
  );
}
