import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function StudentDiscover({ isActive, discoveryClick, eventclick, events, user }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigation = useNavigate();
    const filteredEvents = events.filter(event => 
        event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleJoinClick = (event) => {
        setSelectedEvent(event);
        console.log(event);
        setIsModalOpen(true);
        navigation('/eventregister', {state: {event: event, user:user}});
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);s
    };

    return (
        <section className="sb-body">
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
                {filteredEvents.map((event) => (
                    <div className="sb-devents" key={event.id}>
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
                                    <p> <span style={{ fontWeight: 'bold' }}> Capacity</span>:  {`50/ ${event.capacity}`}</p>
                                </div>
                                <div className="sb-adb">
                                    <button onClick={() => handleJoinClick(event)}>Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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
    );
}