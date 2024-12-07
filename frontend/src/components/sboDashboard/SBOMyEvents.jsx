import { useState } from "react";
import '../../styles/components/SBODashboard/sbomyevent.scss';
import SBOME_PM from "./SBOME_PM";
import appImage from "../../assets/SBOD_Logos/logo.png";

function SBOMyEvents() {
  const [eventCategory, setEventCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event
  const [activeTab, setActiveTab] = useState("MY Events");


  const cards = Array(14).fill(null);

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
            <section className="sbome-items-front-container">
              <label className="sbome-items-container">
                {cards.map((_, index) => (
                  <card key={index} className="sbome-item">
                    <button className="sbome-vd-btn" onClick={() => openModal(`Event ${index + 1} Details`)}>
                      View Details
                    </button>
                  </card>
                ))}
              </label>
            </section>
          </section>
    
          {/* Modal Popup */}
          {isModalOpen && (
            <div className="sbome-modal-overlay">
              <div className="sbome-modal-content">
                <h3 style={{ fontFamily: "Righteous", fontWeight: "normal" }}>Event Overview</h3>
                <p>{selectedEvent}</p>
                <section className="sbome-modal-data-container">
                  <img icon={appImage}/> {/* Temp img kaya na nimo pre sa*/}
                  <label className="sbome-modal-data">
                    <p>Event Name: National Heroe's Day</p>
                    <p>Date: August 28, 2024</p>
                    <p>Location: School Gymnasium </p>
                    <p style={{ textAlign: "left"  }}>Description: National Heroes Day is a day to honor the Filipino heroes who fought for the country's freedom and independence.</p>
                    <p>Total Capacity: 100 Participants</p>
                    <p>Registered Participants: 80 Confirmed </p>
                  </label>
                </section>
                <section className="sbome-eo-btn-container">
                  <button className="sbome-close-btn" onClick={closeModal}>Close</button>
                  <button className="sbome-vr-btn" onClick={viewRegistrationHandler}>View Registration</button>
                </section>
              </div>
            </div>
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