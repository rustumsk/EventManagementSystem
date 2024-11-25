import { useState } from "react";
import '../../styles/sbo-dashboard.scss'
import appImage from "../../assets/SBOD_Logos/logo.png";
import avatarImage from "../../assets/SBOD_Logos/Avatar.png";
import dashboardImage from "../../assets/SBOD_Logos/House.png";
import dataImage from "../../assets/SBOD_Logos/dashboard.png";
import houseImage from "../../assets/SBOD_Logos/space_dashboard.png";
import spaceImage from "../../assets/SBOD_Logos/data_usage.png";
import tuneImage from "../../assets/SBOD_Logos/tune.png";

const images = {
  logo: appImage,
  avatar: avatarImage,
  dashboard: dashboardImage,
  data: dataImage,
  house: houseImage,
  space: spaceImage,
  tune: tuneImage,
};  

const events = [
  "Buwan ng Wika Celebration",
  "Intramural Sports Festival",
  "Annual Sports Day",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase",
  "Talent Showcase"
];

function SBODashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleEventClick = (event) => {
    alert(`You clicked on: ${event}`);
  };

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
            <span>User Avatar</span>
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
          <div>
            <header className="sbod-header">
              <h1 style={{ 
                marginBottom: 15, 
                fontFamily: "Righteous" 
              }}> Dashboard </h1>
              <input
                type="text"
                placeholder="Search Events"
                style={{
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                  width: 850,
                }}
              />
            </header>
            <section className="sbod-events">
              <h3 style={{ fontFamily: "Righteous" }}>Today's Events</h3>
              {/* Todays Events Main Container */}
              <div className="sbod-tevent-cards">
                {/* Today's Event cards */}
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="sbod-tevent-items"
                    onClick={() => handleEventClick(event)}  // Added onClick handler
                  > {event} </div>
                ))}
              </div>
              <h3 style={{ 
                fontFamily: "Righteous",
                marginTop: 20 
              }}>Upcoming Events</h3>
              {/* Upcoming Events Main Container */}
              <div className="sbod-uevent-cards">
                {/* Event cards */}
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="sbod-uevent-items"
                    onClick={() => handleEventClick(event)}  
                  > {event} </div>
                ))}
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
          <div>
            {/* FUcking shit*/}
            
          </div>
        )}
        {activeTab === "My Events" && (
          <div>
            {/* FUcking shit*/}
            
          </div>
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
        {activeTab !== "Dashboard" && (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              fontFamily: "Outfit",
            }}>
            <h1>{activeTab}</h1>
            <p>No contents available for this section yet.</p>
          </div>
        )}
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