import { motion } from 'framer-motion';
import '../../styles/components/SBODashboard/sbome_pm.scss';
import notifImage from "../../assets/SBOD_Logos/notifications.png";
import searchImage from "../../assets/SBOD_Logos/search.png";
import delImage from "../../assets/SBOD_Logos/del_icon.png";
import editImage from "../../assets/SBOD_Logos/edit_icon.png";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState, useEffect } from 'react';
import getStudent from '../../services/studentServices/getStudent';
import { convertToWritten, convertTimestampToReadableFormat, formatCurrentTime } from '../../utils/dateConvert';
import { deleteParticipantById } from '../../services/participantServices/deleteParticipant';
import { updateParticipantStatus } from '../../services/participantServices/updateParticipant';
import { toast, ToastContainer } from 'react-toastify';
import { updateIsOpen } from '../../services/eventServices/updateEvent';
import { getFeedbackByEventId } from '../../services/feedbackServices/getFeedback';
import 'react-toastify/dist/ReactToastify.css';

function SBOME_PM({ event, authToken}) {
  const [showScanner, setShowScanner] = useState(false);
  const [participant, setParticipant] = useState([]);
  const [buttonType, setButtonType] = useState("NoAction");
  const [refresh,setRefresh] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const closeCheckIn = async() =>{
    if (event.is_done){
      toast.error("Event registration is already closed!");
      return;
    }
    if (!event.is_open){
      toast.error("Event registration is already closed!");
      return;
    }
    try{
      await updateIsOpen(authToken, event.event_id);
      toast.success("Event Registration is now Closed!");
      setRefresh(prev => !prev);
    }catch(e){
      console.log(e);
    }
  }
  const handleNotificationClick = () => {
    alert("Not Implemented!");
  };

  const handleScanQRClick = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };
  const handleDelete = () =>{
    if(buttonType === 'Delete'){
      setButtonType('NoAction');
      return
    }
    setButtonType('Delete');
  };

  const handleManual = () =>{
    if(buttonType === 'CheckIn'){
      setButtonType('NoAction');
      return
    }
    setButtonType('CheckIn');
  }

  const deleteParticipant = async(participant_id) =>{
    try{
      console.log("Hello123");
      const dat = await deleteParticipantById(authToken, participant_id);
      console.log(dat);
      toast.success('Participant deleted successfully!');
      console.log("Hello123");
      setRefresh(prev => !prev);
    }catch(e){
      console.log(e);
      toast.error('Failed to delete participant!');
    }
  };

  const updateParticipant = async (participant_id, attendance_status, checked_in, check) => {
    if (check) {
      toast.warn('Participant already Checked In!');
      return;
    }
    try {
      const result = await updateParticipantStatus(authToken, participant_id, attendance_status, checked_in);
      toast.success('Participant status updated successfully!');
      setRefresh(prev => !prev);
    } catch (e) {
      console.error(e);
      toast.error('Failed to update participant status!');
    }
  };

  const qrOnScan = async (result) => {
    console.log(result[0].rawValue);
    const participant_id = Number(result[0].rawValue);
    try {
      const result = await updateParticipantStatus(authToken, participant_id, formatCurrentTime(), true);
      toast.success('Participant status updated successfully!');
      setRefresh(prev => !prev);
    } catch (e) {
      console.error(e);
      toast.error('Failed to update participant status!');
    }
  };

  useEffect(() =>{
    const getAllParticipant = async() =>{
      try{
        const data = await getStudent.getAllParticipatedStudent(authToken, event.event_id);
        console.log(data);
        setParticipant(data);
      }catch(e){
        console.log(e);
      }
    }
    getAllParticipant();
  },[refresh]);
  
  useEffect(() =>{
    const getFeedback = async() =>{
      try{
        const result = await getFeedbackByEventId(authToken, event.event_id);
        setFeedbacks(result);
      }catch(e){
        console.log(e);
      }
    }
    const checkIsOpen = async() =>{
      if (event.is_done){
        await updateIsOpen(authToken, event.event_id)
      }
    }
    getFeedback();
    checkIsOpen();
  },[])
  return (
    <motion.div
      className="sbome-pm-main-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    > 
      <ToastContainer />
      <section className="sbome-pm-back">
        <section className="sbome-pm-front">
          <div className="sbome-pm-content">
            <div className="sbome-pm-content">
              {/* HEADER AND INPUT */}
              <header className="sbome-header">
                <h4>Participant Management for</h4>
                <h1
                  style={{
                    color: "#6C23B5",
                    fontSize: "30px",
                    fontFamily: "Righteous",
                    fontWeight: "normal",
                  }}
                >
                  {event.event_name}
                </h1>
                <div className="sbome-search">
                  <div style={{ position: "relative" }}>
                    <img
                      src={searchImage}
                      alt="Search Icon"
                      className="sbome-imglogo"
                    />
                    <input type="text" placeholder="Search" />
                  </div>
                  <button
                    className="sbome-qr-btn"
                    onClick={handleScanQRClick}
                  >
                    Scan QR Code
                  </button>
                  <div>
                    <img src={delImage} className="sbome-logos-design" onClick={handleDelete}></img>
                    <img src={editImage} className="sbome-logos-design" onClick={handleManual}></img>
                  </div>
                </div>
              </header>

              {/* MAIN DATA */}
              <main className="sbome-list">
                <div className="sbome-titles">
                  <p>Name</p>
                  <p>Status</p>
                  <p>Registration Date</p>
                  <p>Check-In Time</p>
                  <p>Actions</p>
                </div>
                {participant.map((p) => {
                  return (
                    <div className="sbome-datas" key={p.participant_id}> 
                      <p>{p.fullname}</p>
                      <p>{p.checked_in ? 'Checked-In' : 'Not Checked-In'}</p>
                      <p>{convertToWritten(new Date(p.registered_at))}</p>
                      {console.log(p)}
                      <p>{p.attendance_status? p.attendance_status: 'NOT CHECKED IN'}</p>
                      {buttonType === 'NoAction' ? (
                        <button className="sbome-undo-btn" >No Action</button>
                      ) : buttonType === 'Delete' ? (
                        <button className="sbome-undo-btn rd" onClick={() => deleteParticipant(p.participant_id)}>Delete</button>
                      ) : buttonType === 'CheckIn' ? (
                        <button className="sbome-undo-btn grn" onClick={() => updateParticipant(p.participant_id, formatCurrentTime(), true, p.checked_in)}>Check In</button>
                      ) : null}
                    </div>
                  );
                })}
              </main>
            </div>

            {/* SIDE CONTENTS */}
            <div className="sbome-pm-sidecontent">
              <div className="sbome-notif-logo-container">
                <p
                  style={{ cursor: "pointer", fontWeight: 'bold' }}
                  onClick={handleNotificationClick}
                >
                  Send Reminder
                </p>
                <img
                  src={notifImage}
                  alt="Notification Icon"
                  style={{marginRight: 30, height: 20}}
                  className="sbome-notif-logo"
                  onClick={handleNotificationClick}
                />
              </div>
              <section className="sbome-participants">
                <h2>Participants</h2>
                Hello
              </section>
              <section className="sbome-comments-container">
                <h2>Comments</h2>
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback, index) => (
                    <div key={index} className="sbome-comments">
                      <p>{feedback.fullname}</p>
                      <p>{'⭐'.repeat(feedback.rating)}{` (${feedback.rating}/5)`}</p>
                      <p style={{ fontSize: "10px" }}>
                        Rated {feedback.rating}/5 by participant
                      </p>
                      <p>“{feedback.feedback}”</p>
                    </div>
                  ))
                ) : (
                  <p>No feedback available for this event.</p>
                )}
              </section>
            </div>
          </div>
        </section>
      </section>

      {/* Scanner Overlay */}
      {showScanner && (
        <div className="scanner-overlay">
          <div className="scanner-container">
            <Scanner onScan={qrOnScan} />
            <button className="scanner-close-btn" onClick={closeScanner}>
              Close
            </button>
          </div>
        </div>
      )}
      <section className="sbome-pm-cb-container">
        <button className="sbome-pm-cc-btn" onClick={closeCheckIn}>Close Check Ins</button>
      </section>
    </motion.div>
  );
}

export default SBOME_PM;