import { useState, useEffect } from "react";
import '../../styles/components/SBODashboard/sbomyevent.scss';
import SBOME_PM from "./SBOME_PM";
import appImage from "../../assets/SBOD_Logos/logo.png";
import { getEventById } from "../../services/eventServices/getEvent";
import { convertToWritten } from "../../utils/dateConvert";
import { getLocationById } from "../../services/locationServices/getLocation";
import { getDraftById } from "../../services/draftServices/getDraftById";
import { deleteDraftById } from "../../services/draftServices/deleteDraft";
import createEvent from "../../services/eventServices/createEvent";
import { checkIfClose } from "../../services/helper/checkTime";
import { updateIsDone } from "../../services/eventServices/updateEvent";
import { motion } from "framer-motion";
function SBOMyEvents({ setTab, sbo_id, authToken }) {
  const [eventCategory, setEventCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("MY Events");
  const [published, setPublished] = useState([]); // For published events
  const [modalValue, setModalValue] = useState({});
  const [modalValue2, setModal2Value] = useState({});
  const [currentEvent, setCurrentEvent] = useState({});
  const [location, setLocation] = useState({});
  const [draftEvent, setDraftEvent] = useState([]); // For drafts
  const [refresh, setRefresh] = useState(false);

  const createEdeleteF = async(obj, draft_id) =>{
      try{
        await createEvent(authToken, obj);
        await deleteDraftById(authToken, draft_id);
        console.log("Draft Published!");
        setRefresh(prev => !prev);
      }
      catch(e){
        console.log(e);
      }
  }
  const useNigga = (obj) => {
    const date = convertToWritten(new Date(obj.event_date));
    return (
      <div className="sbome-modal-overlay">
        <div className="sbome-modal-content">
          <h3 style={{ fontFamily: "Righteous", fontWeight: "bold", fontSize: '1.3rem' }}>Event Overview</h3>
          <section className="sbome-modal-data-container">
            <span style={{ backgroundImage: `url(${obj.event_image})` }}></span>
            <label className="sbome-modal-data">
              <p>Event Name: {obj.event_name}</p>
              <p>Date: {date}</p>
              <p>Location: {location?.location_name && location?.location_city ? `${location.location_name}, ${location.location_city}` : 'Loading...'}</p>
              <p style={{ textAlign: "left" }}>Description: {obj.event_description}.</p>
              <p>Total Capacity: {obj.capacity} Participants</p>
              <p>Registered Participants: todo</p>
            </label>
          </section>
          <section className="sbome-eo-btn-container">
            <button className="sbome-close-btn" onClick={closeModal}>Close</button>
            <button className="sbome-vr-btn" onClick={() => viewRegistrationHandler(obj)}>View Registration</button>
          </section>
        </div>
      </div>
    );
  };

  const useNigga2 = (draft) => {
    const obj = draft.event_data;
    console.log(obj);
    const date = convertToWritten(new Date(obj.event_date));
    return (
      <div className="sbome-modal-overlay">
        <div className="sbome-modal-content">
          <h3 style={{ fontFamily: "Righteous", fontWeight: "bold", fontSize: '1.3rem' }}>Draft Overview:</h3>
          <section className="sbome-modal-data-container">
            <span style={{ backgroundImage: `url(${obj.event_image})` }}></span>
            <label className="sbome-modal-data">
              <h2>Draft Name: {draft.draft_name}</h2>
              <p>Event Name: {obj.event_name}</p>
              <p>Date: {date}</p>
              <p>Location: {location?.location_name && location?.location_city ? `${location.location_name}, ${location.location_city}` : 'Loading...'}</p>
              <p style={{ textAlign: "left" }}>Description: {obj.event_description}.</p>
              <p>Total Capacity: {obj.capacity} Participants</p>
              <p>Registered Participants: todo</p>
            </label>
          </section>
          <section className="sbome-eo-btn-container">
            <button className="sbome-close-btn" onClick={closeModal2}>Close</button>
            <button className="sbome-vr-btn" onClick={createEdeleteF(obj, draft.draft_id)}>Publish</button>
          </section>
        </div>
      </div>
    );
  };

  const openModal = (eventDetails) => {
    setSelectedEvent(eventDetails);
    setIsModalOpen(true);
  };

  const openModal2 = (eventDetails) => {
    setSelectedEvent(eventDetails);
    setIsModal2Open(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  const closeModal2 = () =>{
    setIsModal2Open(false);
    setSelectedEvent(null);
  }
  const viewRegistrationHandler = (event) => {
    setActiveTab("Participant Management");
    setCurrentEvent(event);
    closeModal();
  };

  useEffect(() => {
    const getPublishedEvents = async () => {
      try {
        const data = await getEventById(authToken, sbo_id.sbo_id);
        console.log("Published events data received:", data);

        if (data && Array.isArray(data)) {
          setPublished(data);
        } else {
          console.error("Unexpected data format for published events:", data);
        }
      } catch (error) {
        console.error("Error fetching published events:", error);
      }
    };

    const getDraftEvents = async () => {
      try {
        const data = await getDraftById(authToken, sbo_id.sbo_id);
        console.log("Draft events data received:", data);
        if (data && Array.isArray(data)) {
          setDraftEvent(data);
        } else {
          console.error("Unexpected data format for draft events:", data);
        }
      } catch (error) {
        console.error("Error fetching draft events:", error);
      }
    };
    getPublishedEvents();
    getDraftEvents();
  }, [authToken, sbo_id.sbo_id, refresh]);

  useEffect(() => {
    const getModalValue = async () => {
      try {
        const data = await getLocationById(authToken, modalValue.location_id);
        console.log("Fetched location data:", data);
        setLocation(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    if (modalValue.location_id) {
      getModalValue();
    }
  }, [modalValue, authToken, refresh]);
  useEffect(() =>{
    const setDone = async () =>{
      const data = await getEventById(authToken, sbo_id.sbo_id);
      data.map(e =>{
        const dat = checkIfClose(e.event_date, e.end_time);
        if(dat === true){
          if(e.is_done === true){
            return;
          }
          updateIsDone(authToken, e.event_id);
          setRefresh(prev => !prev);
        }
      })
    }
    setDone();
  },[]);
  return (
    <>
      {activeTab === "MY Events" && (
        <motion.div
        initial={{ opacity: 0, y: 50 }} // Initial state (hidden, shifted down)
        animate={{ opacity: 1, y: 0 }} // Final state (visible, original position)
        exit={{ opacity: 0, y: -50 }} // Exit state (hidden, shifted up)
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
        >
        <div className="sbome-container">
          <header className="sbome-me-text">
            <h2 style={{ fontFamily: "Righteous", fontWeight: "normal", fontSize: '2rem' }}>My Events</h2>
            <label style={{ display: "flex", alignItems: "end", justifyContent: "end", flex: 1 }}>
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
              <div className="sbome-items-container">
                {currentStep === 2 ? (
                  published.length > 0 ? (
                    published.map((obj, index) => (
                      <div className={obj.is_done?"sbome-item done": "sbome-item"} key={obj.id || index}>
                        <p className="b">Event:</p>
                        <p className="b">{obj.event_name}</p>
                        <p>Date: {convertToWritten(new Date(obj.event_date))}</p>
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
                    <div className="nevents">No events available <a href="#">Create Events</a></div>
                  )
                ) : (
                  draftEvent.length > 0 ? (
                    draftEvent.map((obj, index) => (
                      <div className="sbome-item" key={obj.id || index}>
                        <p className="b">Drafted Event: </p>
                        <p className="b">{obj.draft_name}</p>
                        <p>Created at: March 18 2022</p>
                        <div className="btn-cont">
                          <button className="det" onClick={() => {
                            openModal2(`Event ${index + 1} Details`);
                            setModal2Value(obj);
                          }}>View Details</button>
                          <button className="pub">Publish</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="nevents">No drafts available <a href="#">Create Drafts</a></div>
                  )
                )}
              </div>
            </section>
          </section>
        </div>
        </motion.div>)}
      {activeTab === "Participant Management" && <SBOME_PM event={currentEvent} authToken={authToken}/>}
      {isModalOpen && useNigga(modalValue)}
      {isModal2Open && useNigga2(modalValue2)}
    </>
  );
}

export default SBOMyEvents;
