import { useState, useEffect } from "react";
import { getEventByStudentId } from "../../services/eventServices/getEvent";
import { useNavigate } from "react-router-dom";
import { getParticipantES } from "../../services/participantServices/getParticipant";
import { toast, ToastContainer } from "react-toastify";
import { createFeedback } from "../../services/feedbackServices/createFeedback";

export default function StudentEvent({ user, userToken, isActive, eventclick, discoveryClick }) {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentEvent, setRecentEvent] = useState({});
    const [feedback, setFeedback] = useState("");

    const handleStarClick = (value) => {
        setRating(value);
    };

    const submitRate = async (event) => {
        if (rating === 0) {
            toast.warn("Rating cannot be 0!");
            return;
        }
        console.log(rating);
        setRecentEvent(event);
        setIsModalOpen(true);
    };
    const submitModal = async() =>{
        if (!feedback.length > 0){
            toast.error("Feedback must not be empty!");
            return;
        }
        const data = {
            event_id : recentEvent.event_id,
            student_id: user.student_id,
            rating: rating,
            feedback: feedback
        }
        try{
            createFeedback(userToken, data);
        }catch(e){  
            console.log(e);
        }
    }
    const clickQr = async (event) => {
        try {
            const result = await getParticipantES(event.event_id, user.student_id);
            navigate('/registerdetails', { state: { event, user, token: userToken, participant_id: result } });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await getEventByStudentId(userToken, user.student_id);
                console.log(data[0].is_done);
                const regHolder = [];
                const pastHolder = [];
                data.map(event => {
                    if (event.is_done) {
                        pastHolder.push(event);
                    }
                    else {
                        regHolder.push(event);
                    }
                });
                setRegisteredEvents(regHolder);
                setPastEvents(pastHolder);
            } catch (e) {
                console.log(e);
            }
        };
        getEvents();
    }, []);

    return (
        <section className="sb-body">
            <ToastContainer />
            <section className='sb-welcome'>
                <p className='sb-wel sb-mwel'>My Events</p>
                <p className='sb-kick sb-mkick'>Manage Your Event Participation</p>
                <p className='sb-mgay'>Stay organized by keeping track of all your registered events. View upcoming and past events, and set reminders so you never miss out!</p>
            </section>
            <section className='sb-discover'>
                <button className='sb-ed' onClick={discoveryClick}><span className='ed-icon'></span> Event Discovery</button>
                <button className={`sb-me ${isActive === 'myevent' ? 'ed-high' : ''}`} onClick={eventclick}><span className='me-icon'></span> My Events</button>
            </section>
            <section className='sb-mecontainer'>
                <section className='sb-mregistered'>
                    <section className='sb-msearch'>
                        <div className="sb-input-container">
                            <input type="text" placeholder="Search" />
                            <span className="sb-search-icon"></span>
                        </div>
                    </section>
                    <section className='sb-mdesc'>
                        <div className='sb-mp'>
                            <p>
                                Registered Events
                            </p>
                        </div>
                    </section>
                    <section className='sb-mrevents'>
                        {registeredEvents.length > 0 ? registeredEvents.map((event) => {
                            return <div className="re-reg" key={event.event_id}>
                                <header className="reg-head">{event.event_name}</header>
                                <section className="reg-body">
                                    <section className="reg-img">
                                        <span style={{ backgroundImage: `url(${event.event_image})` }}></span>
                                    </section>
                                    <section className="reg-det">
                                        <p className="overview">Overview: </p>
                                        <p className="desc">{event.event_description}</p>
                                        <p className="dets">Details:</p>
                                        <p className="det">   Date: {event.event_date}</p>
                                        <p className="det">   Time: {event.start_time} - {event.end_time}</p >
                                        <section className="regbtn">
                                            <button onClick={() => clickQr(event)}>QR Code</button>
                                        </section>
                                    </section>
                                </section>
                            </div>
                        }) : <span>Not Registered To Any Events!</span>}
                    </section>
                </section>
                <section className='sb-mprev'>
                    <header className='sb-mpevent'>
                        <p>Previous Events</p>
                    </header>
                    <section className='sb-mpevents'>
                        {pastEvents.length > 0 ? pastEvents.map((event) => {
                            return <div className="pastEvent" key={event.event_id}>
                                <h2>{event.event_name}</h2>
                                <p>{`Date: ${event.event_date}`}</p>
                                <p>{`Time: ${event.start_time} - ${event.end_time}`}</p>
                                <p>{`Location: ${event.location_id}`}</p>
                                <div className="rating">
                                    <span>Rate: </span>
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <span
                                                key={starValue}
                                                className={`star ${starValue <= rating ? 'filled' : ''}`}
                                                onClick={() => handleStarClick(starValue)}
                                            >
                                                ★
                                            </span>
                                        );
                                    })}
                                </div>
                                <button className="rate-button" onClick={() => submitRate(event)}>Rate</button>
                            </div>
                        }) : <span>You don't have any past events!</span>}
                    </section>
                </section>
            </section>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <header className="modal-header">
                            <h2>Share Feedback</h2>
                            <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
                        </header>
                        <div className="modal-body">
                            <p>Share your thoughts, suggestions, or experiences related to the event in the space below.</p>
                            <textarea placeholder="Enter description here" className="feedback-textarea" value={feedback} onChange={(e) => setFeedback(e.target.value)}/>
                        </div>
                        <footer className="modal-footer">
                            <button className="submit-feedback" onClick={submitModal}>Submit Feedback</button>
                        </footer>
                    </div>
                </div>
            )}

            <section className='small-footer'>
                <p>© 2024 UniJam. All rights reserved. Unauthorized use of content and materials is prohibited.</p>
            </section>
        </section>
    );
}
