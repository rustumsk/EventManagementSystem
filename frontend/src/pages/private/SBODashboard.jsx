import { useState, useRef,useContext,useEffect } from "react";
import '../../styles/sbo-dashboard.scss';
import SBOCreateEvent from "../../components/sboDashboard/SBOCreateEvent";
import SBOMyEvents from "../../components/sboDashboard/SBOMyEvents";

import appImage from "../../assets/SBOD_Logos/logo.png";
import avatarImage from "../../assets/SBOD_Logos/Avatar.png";
import dashboardImage from "../../assets/SBOD_Logos/House.png";
import dataImage from "../../assets/SBOD_Logos/dashboard.png";
import houseImage from "../../assets/SBOD_Logos/space_dashboard.png";
import spaceImage from "../../assets/SBOD_Logos/data_usage.png";
import { useNavigate } from 'react-router-dom';
import tuneImage from "../../assets/SBOD_Logos/tune.png";
import notifImage from "../../assets/SBOD_Logos/notifications.png";
import searchImage from "../../assets/SBOD_Logos/search.png";
import { userContext } from "../../main";
import { decodeToken } from "../../utils/auth";
import getSbo from "../../services/sboServices/getSbo";

const images = {
  logo: appImage,
  avatar: avatarImage,
  dashboard: dashboardImage,
  data: dataImage,
  house: houseImage,
  space: spaceImage,
  tune: tuneImage,
  notification: notifImage,
  search: searchImage,
};

const todaysEvents = [
  "Buwan ng Wika Celebration",
  "Intramural Sports Festival",
  "Annual Sports Day",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
];

const upcomingEvents = [
  "Buwan ng Wika Celebration",
  "Intramural Sports Festival",
  "Annual Sports Day",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
];

function SBODashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const todayEventsRef = useRef(null); // Ref for the Today's Events container
  const [currentStep, setCurrentStep] = useState(1); // CREATE USER steps
  const navigate = useNavigate();
  const [sboToken, setSboToken] = useState(localStorage.getItem('sboToken'));
  const {sbo, setSbo} = useContext(userContext);

  const handleEventClick = (event) => {
    alert(`You clicked on: ${event}`);
  };

  const handleNotificationClick = () => {
    alert("Notification icon clicked");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodaysEvents = todaysEvents.filter(event =>
    event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUpcomingEvents = upcomingEvents.filter(event =>
    event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWheelScroll = (e) => {
    if (todayEventsRef.current) {
      todayEventsRef.current.scrollLeft += e.deltaY; 
      e.preventDefault(); 
    }
  };

  if (!sboToken) {
    navigate('/sbologin');
    console.log("invalid!");
  }


  useEffect(() =>{
      const fetchSboData = async () =>{
        const token = sboToken;
        if(!token){
            navigate('/sbologin');
            console.log("invalid!");
        }
        const sbo_id = decodeToken(token);
        if (sbo_id){
          const sboData = await getSbo.getSboById(token, sbo_id.userObj);
          setSbo(sboData.data);
        }
      }
      fetchSboData();
  }, [sboToken])
  return (
    <div className="sbod-container">
      {/* Sidebar */}
      <nav className="sbod-sidebar">
        {/* Logo */}
        <div className="sbod-logo">
          <img src={images.logo} alt="App Logo" />
        </div>
        {/* Avatar */}
        <div 
          className="sbod-avatar" 
          onClick={() => setActiveTab("User Avatar")}>
          <img src={images.avatar} alt="App Logo" />
          <div style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 5
          }}>
            <span>{sbo.sbo_name}</span>
            <span className="sbod-role" style={{ marginLeft: 2}}>Admin</span>
          </div>
        </div>
        {/* Navigation Items */}
        <div className="sbod-nav-items">
          <NavItem
            icon={images.dashboard}
            label="Dashboard"
            isActive={activeTab === "Dashboard"}
            onClick={() => setActiveTab("Dashboard")}
          />
          <NavItem
            icon={images.data}
            label="Create Events"
            isActive={activeTab === "Create Events"}
            onClick={() => setActiveTab("Create Events")}
          />
          <NavItem
            icon={images.house}
            label="My Events"
            isActive={activeTab === "My Events"}
            onClick={() => setActiveTab("My Events")}
          />
          <NavItem
            icon={images.space}
            label="Analytics"
            isActive={activeTab === "Analytics"}
            onClick={() => setActiveTab("Analytics")}
          />
          <NavItem
            icon={images.tune}
            label="Settings"
            isActive={activeTab === "Settings"}
            onClick={() => setActiveTab("Settings")}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="sbod-main">
        {/* NAVITEM ACTIVE TABS */}
        {activeTab === "Dashboard" && (
          <div style={{ display: "flex", flexDirection: "column"}}>
            <header className="sbod-header">
              <h1 style={{ 
                marginBottom: 15, 
                fontFamily: "Righteous", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                width: "100%" 
              }}> 
                Dashboard
                <img 
                  src={images.notification} 
                  alt="Notification Icon" 
                  style={{
                    width: "20px", 
                    height: "20px", 
                    cursor: "pointer",
                  }}
                  onClick={handleNotificationClick} 
                />
              </h1>
              {/* Search Section */}
              <div style={{ position: "relative", width: "100%" }}>
                <img 
                  src={images.search} 
                  alt="Search Icon" 
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    pointerEvents: "none",  // Disable click on icon
                  }}
                />
                <input
                  type="text"
                  placeholder="Search Events"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </header>
            <section className="sbod-events">
              <h2 style={{ fontFamily: "Righteous" }}>Today's Events</h2>
              {/* Today's Event Main Container */}
              <div
                className="sbod-tevent-cards"
                ref={todayEventsRef} // Attach ref here
                onWheel={handleWheelScroll} // Add wheel event handler
              >
                {/* Today's Event cards */}
                {filteredTodaysEvents.length > 0 ? (
                  filteredTodaysEvents.map((event, index) => (
                    <div
                      key={index}
                      className="sbod-tevent-items"
                      onClick={() => handleEventClick(event)}
                    >
                      {event}
                    </div>
                  ))
                ) : (
                  <div className="no-events">Sir None</div>
                )}
              </div>
              <h2 style={{ 
                fontFamily: "Righteous",
                marginTop: 20 
              }}>Upcoming Events</h2>
              {/* Upcoming Events Main Container */}
              <div className="sbod-uevent-cards">
                {/* Event cards */}
                {filteredUpcomingEvents.length > 0 ? (
                  filteredUpcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="sbod-uevent-items"
                      onClick={() => handleEventClick(event)}  
                    >
                      {event}
                    </div>
                  ))
                ) : (
                  <div className="no-events">Sir None</div>
                )}
              </div>
            </section>
          </div>
        )}
        {activeTab === "User Avatar" && (
          <div>
            {/* FUcking shit*/}
            
          </div>
        )}
        {activeTab === "Create Events" && (
          <SBOCreateEvent />
        )}
        {activeTab === "My Events" && (
          <SBOMyEvents />
        )}
        {activeTab === "Analytics" && (
          <div>
            {/* FUcking shit*/}
            
          </div>
        )}
        {activeTab === "Settings" && (
          <div>
            {/* FUcking shit*/}
            
          </div>
        )}
        {/* {activeTab !== "Dashboard" && (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              fontFamily: "Outfit",
            }}>
            <h1>{activeTab}</h1>
            <p>No contents available for this section yet.</p>
          </div>
        )} */}
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, role, isActive, onClick }) => (
  <div
    className={`sbod-nav-item ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    <img src={icon} alt={label} />
    <div style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <span>{label}</span>
      <span className="sbod-role">{role}</span>
    </div>
  </div>
);

export default SBODashboard;