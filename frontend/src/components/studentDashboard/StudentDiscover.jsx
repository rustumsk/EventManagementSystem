import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParticipantES } from '../../services/participantServices/getParticipant';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
export default function StudentDiscover({ isActive, discoveryClick, eventclick, events, user, userToken }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigation = useNavigate();
    const filteredEvents = events.filter(event => 
        event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_description.toLowerCase().includes(searchQuery.toLowerCase())

    );

    const handleJoinClick = async (event) => {
        // const data = await getParticipantES(event.event_id, user.student_id);
        // if (data > 0){
        //     toast.error("You already joined this event!");
        //     return;
        // }
        setSelectedEvent(event);
        console.log(event);
        setIsModalOpen(true);
        navigation('/eventregister', {state: {event: event, user:user, token:userToken}});
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);s
    };

    return (
        <motion.div
            initial={{ x: '-10%'}}  // Start just slightly off-screen to the left
            animate={{ x: 0}}       // Slide into its normal position
            transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.5,   // Short duration for minimal movement
            ease: 'easeOut', // Smooth finish
            }}
        >
        <section className="sb-body">
            <ToastContainer />
            <section className='sb-welcome'>
                <p className='sb-ds'>Discover Exciting Events!</p>
                <p className='sb-en'>Join us to engage, learn, and network with your peers at our upcoming events."</p>
            </section>
            <section className='sb-discover'>
                <button className={`sb-ed ${isActive === 'discovery' ? 'ed-high' : ''}`} onClick={discoveryClick}>
                    <span className='ed-icon'></span> Event Discovery
                </button>
                <button className='sb-me' onClick={eventclick}>
                    <span className='me-icon'></span> My Events
                </button>
            </section>
            <section className="sb-search">
                <div className="sb-search-wrapper">
                    <span className="sb-search-icon">⌕</span>
                    <input 
                        type="text" 
                        placeholder="Search Events" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </div>
            </section>
            <section className='sb-ediscover'>
            {filteredEvents.length > 0
                ? filteredEvents.map((event) => (
                    <div className="sb-devents" key={event.id}>
                        {console.log(event.is_open)}
                        <div className="sb-du">
                            <p>{event.event_name}</p>
                        </div>
                        <div className="sb-dd">
                            <div className="sb-pic">
                                <span style={{ backgroundImage: `url('${event.event_image}')` }}></span>
                            </div>
                            <div className="sb-ad">
                                <div className="sb-ado">
                                    <p className="sb-po">Overview:</p>
                                    <p className="sb-pd">{event.event_description}</p>
                                </div>
                                <div className="sb-adp">
                                    <p> <span className="adp-span"style={{ fontWeight: 'bold' }}> Capacity</span>:  {`50/ ${event.capacity}`}</p>
                                </div>
                                <div className="sb-adb">
                                    {event.is_open? <button onClick={() => {toast.warn("Event Registration is Closed!")}}>Registration Closed</button>:
                                    <button onClick={() => handleJoinClick(event)}>Join</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : <span> No Events Available at The Moment </span>
            }
            </section>
            <section className='small-footer'>
                <p>© 2024 UniJam. All rights reserved. Unauthorized use of content and materials is prohibited.</p>
            </section>

            {isModalOpen && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Join Event</h2>
                        <div className="modal-content">
                        <div className="modal-image">
                        </div>
                            <p>Are you sure you want to join the {selectedEvent?.event_name} event?</p>
                        </div>
                        <div className="modal-actions">
                            <button className="confirm-button" onClick={closeModal}>Confirm</button>
                            <button className="cancel-button" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
        </motion.div>
    );
}