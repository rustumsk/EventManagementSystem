import { useState, useEffect } from "react";
import '../../styles/components/SBODashboard/sbomyevent.scss';
import SBOME_PM from "./SBOME_PM";
import appImage from "../../assets/SBOD_Logos/logo.png";
import { getEventById } from "../../services/eventServices/getEvent";
import { convertToWritten } from "../../utils/dateConvert";
import { getLocationById } from "../../services/locationServices/getLocation";
import { getDraftById } from "../../services/draftServices/getDraftById";


function SBOMyEvents({setTab, sbo_id, authToken}) {
  const [eventCategory, setEventCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event
  const [activeTab, setActiveTab] = useState("MY Events");
  const [published, setPublished] = useState([]);
  const [modalValue, setModalValue] = useState({});
  const [location, setLocation] = useState({});
  const [draftEvent, setDraftEvent] = useState([]);
  const useNigga = (obj) =>{
      const date = convertToWritten(new Date(obj.event_date));
      // const l = location?.location_name && location?.location_city
      // ? `${location.location_name}, ${location.location_city}`
      // : "Loading location...";
      return(
        <div className="sbome-modal-overlay">
              <div className="sbome-modal-content">
                <h3 style={{ fontFamily: "Righteous", fontWeight: "bold", fontSize: '1.3rem' }}>Event Overview</h3>
                <section className="sbome-modal-data-container">
                <span style={{ backgroundImage: `url(${obj.event_image})` }}></span>

                  <label className="sbome-modal-data">
                    <p>Event Name: {obj.event_name}</p>
                    <p>Date: {date}</p>
                    <p>Location: {location?.location_name && location?.location_city ? `${location.location_name}, ${location.location_city}` : 'Loading...'}</p>
                    <p style={{ textAlign: "left"  }}>Description: {obj.event_description}.</p>
                    <p>Total Capacity: {obj.capacity} Participants</p>
                    <p>Registered Participants: todo </p>
                  </label>
                </section>
                <section className="sbome-eo-btn-container">
                  <button className="sbome-close-btn" onClick={closeModal}>Close</button>
                  <button className="sbome-vr-btn" onClick={viewRegistrationHandler}>View Registration</button>
                </section>
              </div>
            </div>
      )
  }
  // Function to open the modal and set event details
  const openModal = (eventDetails) => {
    setSelectedEvent(eventDetails);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // open Participant Management(PM) Page
  const viewRegistrationHandler = () => {
    setActiveTab("Participant Management");
  }
  useEffect(() =>{
    const getpublishedEvent = async() =>{
      try{
        const data = await getEventById(authToken,sbo_id.sbo_id);
        setPublished(data);
      }catch(e){
        console.log(e);
      }
    }
    const getDraftEvent = async() =>{
      try{
        const data = await getDraftById(authToken, sbo_id.sbo_id);
        setDraftEvent(data);
      }catch(e){
        console.log(e);
      }
    }
    getpublishedEvent();
    getDraftEvent();
  },[]);

  useEffect(() =>{
    const getModalValue = async() =>{
      try{
        const data = await getLocationById(authToken, modalValue.location_id);
        console.log(data);
        setLocation(data);
      }
      catch(e){
        console.log(e);
      }
    }
    getModalValue();
  }, [modalValue])
  return (
    <>
      {activeTab === "MY Events" && (
        <div className="sbome-container">
          <header className="sbome-me-text">
            <h2 style={{ fontFamily: "Righteous", fontWeight: "normal" }}>My Events</h2>
            <label style={{ display: "flex", alignItems: "end", justifyContent: "end", flex: 1 }}>
              <select className="sbome-filter-option" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                <option value="TodaysEvent">Today's Events</option>
                <option value="UpcomingEvent">Upcoming Events</option>
              </select>
            </label>
          </header>
    
          <section className="sbome-tabs-container">
            <section className="sbome-dp-tabs">
              <label className={`sbome-te ${currentStep === 1 ? "highlight" : ""}`} onClick={() => setCurrentStep(1)}>Drafts</label>
              <label className={`sbome-ue ${currentStep === 2 ? "highlight" : ""}`} onClick={() => setCurrentStep(2)}>Published</label>
            </section>
          </section>
    
          <section className="sbome-items-back-container">
            <section className="sbome-items-front-container" onClick={() =>{console.log('Fuck you')}}>
              <div className="sbome-items-container">
              {currentStep === 2 ? (
                published.length > 0 ? (
                  published.map((obj, index) => (
                    <div className="sbome-item">
                      <p className="b">Event:</p>
                      <p className="b">{obj.event_name}</p>
                      <p>Date: March 10 2024</p>
                      <p>Participant 69 / 0</p>
                      <button
                        onClick={() => {
                          openModal(`Event ${index + 1} Details`);
                          setModalValue(obj);
                        }}
                        className="sbome-vd-btn"
                      >
                        View Details
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="nevents"> No events available <a href="">Create Events</a></div>
                )
              ) : (
                draftEvent.length > 0 ? (
                  draftEvent.map((obj, index) => (
                    <div className="sbome-item">
                      <p className="b">Drafted Event: </p>
                      <p className="b">{obj.draft_name}</p>
                      <p>Created at: March 18 2022</p>
                      <div className="btn-cont">
                        <button className="det">View Details</button>
                        <button className="pub">Publish</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="nevents">{console.log(draftEvent)} No drafts  available <a href="">Create Drafts</a></div>
                )
              )}
              </div>
            </section>
          </section>
    
          {isModalOpen && (
            useNigga(modalValue)
          )}
        </div>
      )}
      {activeTab === "Participant Management" && (
        <>
          <SBOME_PM/>
        </>
      )}
    </>
  );
}

export default SBOMyEvents;