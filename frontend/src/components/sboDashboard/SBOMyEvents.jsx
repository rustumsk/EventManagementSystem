import { useState } from "react";
import '../../styles/components/SBODashboard/sbomyevent.scss';
function SBOMyEvents() {
  const [eventCategory, setEventCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event

  const cards = Array(14).fill(null); // Simulating 14 event cards

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

  return (
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
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Event Details</h3>
            <p>{selectedEvent}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SBOMyEvents;