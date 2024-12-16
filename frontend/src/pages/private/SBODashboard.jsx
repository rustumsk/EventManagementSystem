import { useState, useRef,useContext,useEffect } from "react";
import '../../styles/sbo-dashboard.scss';

import SBOCreateEvent from "../../components/sboDashboard/SBOCreateEvent";
import SBOMyEvents from "../../components/sboDashboard/SBOMyEvents";
import SBOSettings from "../../components/sboDashboard/SBOSettings";

import appImage from "../../assets/SBOD_Logos/logo.png";
import avatarImage from "../../assets/SBOD_Logos/Avatar.png";
import dashboardImage from "../../assets/SBOD_Logos/House.png";
import dataImage from "../../assets/SBOD_Logos/dashboard.png";
import houseImage from "../../assets/SBOD_Logos/space_dashboard.png";
import spaceImage from "../../assets/SBOD_Logos/data_usage.png";
import { useNavigate } from 'react-router-dom';
import tuneImage from "../../assets/SBOD_Logos/tune.png";
import notifImage from "../../assets/SBOD_Logos/notifications.png";
import lo from '../../assets/SBOD_Logos/logout.svg';
import check  from '../../assets/checked.png'
import searchImage from "../../assets/SBOD_Logos/search.png";
import { userContext } from "../../main";
import { decodeToken } from "../../utils/auth";
import getSbo from "../../services/sboServices/getSbo";
import { convertToWritten,extractTimeFromTimestamp } from "../../utils/dateConvert";
import { getEventById } from "../../services/eventServices/getEvent";
import { getLocationById } from "../../services/locationServices/getLocation";
import SBOME_PM from "../../components/sboDashboard/SBOME_PM";
import SBOApproval from "../../components/sboDashboard/SBOAprroval";
import Analytics from "../../components/sboDashboard/SBOAnalytics";
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
  delete: lo,
  check: check
};


function SBODashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const todayEventsRef = useRef(null); // Ref for the Today's Events container
  const [currentStep, setCurrentStep] = useState(1); // CREATE USER steps
  const navigate = useNavigate();
  const [sboToken, setSboToken] = useState(localStorage.getItem('sboToken'));
  const {sbo, setSbo} = useContext(userContext);
  const [event, setEvent] = useState([]);
  const [activeEvent, setActiveEvent] = useState({});
  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const img = event.event_image;
  const handleEventClick = (event) => {
    alert(`You clicked on: ${event}`);
  };

  const handleNotificationClick = () => {
    alert("Notification icon clicked");
  };
  const clickEvent = (event) =>{
    setActiveEvent(event)
    setActiveTab("Sample")
  }
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const returnEventDiv = (event) =>{
    const d = convertToWritten(new Date(event.event_date));
    const ft = extractTimeFromTimestamp(event.event_date);
    const et = extractTimeFromTimestamp(event.ends_at);
    return(
          <div className="sti-cont" onClick={() => clickEvent(event)}>
            <header className="sti-head">{event.event_name}</header>
            <div className="sti-d"><span>Date: </span> {d}</div>
            <div className="sti-d"><span>Time: </span> {ft + et}</div>
            <div className="sti-d"><span>Location: </span> School Auditorium</div>
            <div className="sti-d"><span>Category: </span> Cultural</div>
            <footer className="sti-images">
              <div className="sti-image" style={{ backgroundColor: "#6C7A89" }}></div>
              <div className="sti-image" style={{ backgroundColor: "#34495E" }}></div>
              <div className="sti-image" style={{ backgroundColor: "#95A5A6" }}></div>
              <div className="sti-image">+5</div>
            </footer>
          </div>
    )
  }
  useEffect(() => {
    const fetchSboData = async () => {
      const token = sboToken;
      const todayDate = new Date();
      todayDate.setHours(0,0,0,0);
  
      if (!token) {
        navigate('/sbologin');
        console.log("invalid!");
      }
  
      const sbo_id = decodeToken(token);
      if (sbo_id) {
        const sboData = await getSbo.getSboById(token, sbo_id.userObj);
        setSbo(sboData.data);
        console.log(sboData.data);
  
        const data = await getEventById(sboToken, sboData.data.sbo_id);
  
        const todayEvents = [];
        const upcomingEvents = [];
        data.forEach( async (dat) => {
          const eventDate = new Date(dat.event_date);
          eventDate.setHours(0,0,0,0);
          const dateToday = new Date();
          dateToday.setHours(0,0,0,0);
          if (eventDate.getTime() === dateToday.getTime()) {
            todayEvents.push(dat);
          } else{
            upcomingEvents.push(dat);
          }
        });
        console.log(upcomingEvents)
        setToday(todayEvents);
        setUpcoming(upcomingEvents);
      }
    };
  
    fetchSboData();
  }, [activeTab]);

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
          onClick={() => setActiveTab("Settings")}>
          <img src={sbo.sbo_image} alt="App Logo" />
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
          <NavItem
            icon={images.check}
            label="Registration"
            isActive={activeTab === "approve"}
            onClick={() => setActiveTab("approve")}
          />
          <NavItem
            icon={images.delete}
            label="Logout"
            onClick={() => {
              localStorage.removeItem('sboToken');
              navigate('/sbologin');
            }}
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
                ref={todayEventsRef} 
                onWheel={handleWheelScroll}
              >
                {/* Today's Event cards */}
                {today.length > 0 ? (
                  today.map((event) => (
                    <div  key={event.event_id}
                    className="sbod-tevent-items"
                    >
                      {returnEventDiv(event)}
                  </div>
                  ))
                ) : (
                  <span className="no-events">You have no events today!</span>
                )}
              </div>
              <h2 style={{ 
                fontFamily: "Righteous",
                marginTop: 20 
              }}>Upcoming Events</h2>
              {/* Upcoming Events Main Container */}
              <div className="sbod-uevent-cards">
                {/* Event cards */}
                {upcoming.length > 0 ? (
                  upcoming.map((event) => (
                    <div
                      key={event.event_id}
                      className="sbod-uevent-items"
                    >
                      {returnEventDiv(event)}
                    </div>
  
                  ))
                ) : (
                  <div className="no-events">You have no upcoming Events!</div>
                )}
              </div>
            </section>
          </div>
        )}
        {activeTab === "User Avatar" && (
          <div>
            
          </div>
        )}
        {activeTab === "Create Events" && (
          <SBOCreateEvent sbo={sbo} sboToken={sboToken}/>
        )}
        {activeTab === "My Events" && (
          <SBOMyEvents sbo_id={sbo} authToken={sboToken}/>
        )}
        {
          activeTab === "Sample" &&(
            <SBOME_PM event={activeEvent} authToken={sboToken}/>
          )
        }
        {activeTab === "Analytics" && (
          <div>
            <Analytics />
          </div>
        )}
        {activeTab === "approve" &&(
          <div>
            <SBOApproval authToken={sboToken} sbo={sbo}/>
          </div>
        )}
        {activeTab === "Settings" && (
          <div>
            <SBOSettings sbo={sbo} sboIcon={sbo.sbo_image}/>
            
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