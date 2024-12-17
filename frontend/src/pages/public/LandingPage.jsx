import { useState, useEffect } from 'react';
import '../../styles/landing.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import appImage from "../../assets/SBOD_Logos/logo.png";
import l_d from "../../assets/lading-l-d.png";
import r_d from "../../assets/landing-r-d.png";
import r_e from "../../assets/empower.png";
import r_b from "../../assets/r-btn.png";
import s_d from "../../assets/student-d.png";
import s_d1 from "../../assets/student-d1.png";
import s_d2 from "../../assets/student-d2.png";
import e_d from "../../assets/event-dd.png";
import c_d from "../../assets/comments-d.png";
import a_d from "../../assets/analytics-d.png";





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
  "Build a community by reaching students across campus effectively.",
  "Create an account or log in to explore the latest events and manage your registrations.",
  "Browse events on campus with categories, featured recommendations, and upcoming events right at your fingertips.",
  "Select events you’re interested in, fill out a quick registration form, and secure your spot.",
  "When event day arrives, simply scan the provided QR code at the entrance for a fast, contactless check-in."
  
];

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleMouseClick = () => setIsDropdownOpen(!isDropdownOpen);
  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);
  const handleStudentLoginClick = () => navigate('/StudentLogin');
  const handleSBOLoginClick = () => navigate('/SBOLogin');
  const handleSignup = () => navigate('/Signup');
  const hiRustum = () => {
    alert("Hi rustum")
  }


  return (
    <div className="lp-l-container">
      <section className="lp-sec lp-first">
        <header className="lp-f-header">
          <section className="lp-head-container">
            <section className="lp-info-container">
              <div className="lp-logo">
                <img src={appImage} alt="App Logo" />
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
                      <li className="lp-dropdown-item" onClick={handleSBOLoginClick}>SBO</li>
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
            <section className="lp-l-d-c">
              <img src={l_d} alt="App Logo" className="lp-l-d"/>
            </section>
          </section>
          <section className="lp-r-sec">
            <section className="lp-r-d-c">
              <img src={r_d} alt="App Logo" className="lp-r-d"/>
            </section>
            <section className="lp-r-e-c">
              <img src={r_e} alt="App Logo" className="lp-r-e"/>
            </section>
            <section className="lp-r-t-c">
              <section className="lp-r-text-c">
                <span>Manage your organization’s events with ease. 
                Click here to streamline your planning and enhance student engagement!</span>
                <button className="lp-r-button" onClick={hiRustum}>
                  <img src={r_b} alt="logo" style={{ width: '35px', height: '35px', backgroundColor: '#FFF5D5' }} />
                </button>
              </section>
            </section>
          </section>
        </section>
      </section>
      <section className="lp-sec lp-second">
        <section className='lp-sr'>
          <section className='lp-t-con'>
            <p className='lp-s'>For Students</p>
            <p className='lp-n'>{texts[6]}</p>
            <section className='lp-p-c'>
              <p className='lp-p'>
                {texts[7]} 
                <img src={s_d} className='lp-student-design'/>
              </p>
            </section>
            <section className='lp-p1-c'>
              <p className='lp-p1'>
                <img src={s_d1} className='lp-student-design'/>
                {texts[8]}
              </p>
            </section>
            <section className='lp-p2-c'>
              <p className='lp-p2'>
                <img src={s_d2} className='lp-student-design'/>
                {texts[9]}
              </p>
            </section>
          </section>
        </section>
      </section>
      <section className="lp-sec lp-third">
        <section className='lp-sl'>
          <section className='lp-t-con'>
            <p className='lp-s'>For SBOs</p>
            <p className='lp-n'>{texts[10]}</p>
            <section className='lp-p-c'>
              <section className='lp-p-container'>
                <section className='lp-p-inside'>
                  <img src={e_d}/>
                </section>
                <p className='lp-p'>{texts[11]}</p>
              </section>
              <section className='lp-p1-container'>
                <p className='lp-p1'>{texts[12]}</p>
                <section className='lp-p1-inside'>
                 <img src={c_d}/>
                </section>
              </section>
              <section className='lp-p2-container'>
                <section className='lp-p2-inside'>
                 <img src={a_d}/>
                </section>
                <p className='lp-p2'>{texts[13]}</p>
              </section>
            </section>
          </section>
        </section>
      </section>
      <section className="lp-sec lp-fourth">
        <div className="lp-fcont">
          <section className='lp-ls'>
            <section className="lp-l-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView="auto"
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                loop={true}          
                autoplay={{
                  delay: 3000,           
                  disableOnInteraction: true, 
                }}
                speed={800}           
              >
                <SwiperSlide className='cSlide'>
                  <div className='lp-sl sl1'>
                    <p>{texts[14]}</p>
                    <p>{texts[15]}</p>
                    <p>{texts[16]}</p>
                    <p>{texts[17]}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className='cSlide'>
                  <div className='lp-sl sl2'>
                    <div className="lp-qr"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className='cSlide'>
                  <div className='lp-sl sl3'>
                    123
                  </div>
                </SwiperSlide>
                <SwiperSlide className='cSlide'>
                  <div className='lp-sl sl4'>
                    
                  </div>
                </SwiperSlide>
              </Swiper>
            </section>
          </section>
          <section className='lp-rs'>
            <section className='lp-fcont1'>
              <p className='lp-ftitle'>Revolutionize Your Event with QR Code Check-Ins</p>
              <section className='lp-fdescription'>
                <p>How It Works</p>
                <p>Seamlessly discover, register, and manage events – all in a few simple steps!</p>
              </section>
              <section className='lp-fsteps'>
                <p className='f-step'>Step 1: Sign Up or Log In</p>
                <p className='f-step'>Step 2: Discover Events</p>
                <p className='f-step'>Step 3: Register Instantly</p>
                <p className='f-step'>Step 4: Easy Check-In with QR Code</p>
              </section>
              <p className='lp-fbot'>When event day arrives, simply scan the provided QR code at the entrance for a fast, contactless check-in.</p>
            </section>
          </section>
        </div>
      </section>
      <section className="lp-sec lp-fifth"></section>
    </div>
  );
}