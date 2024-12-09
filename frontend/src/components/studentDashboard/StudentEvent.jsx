export default function StudentEvent({isActive,eventclick,discoveryClick}){
    const registeredEvents = [];
    return(
        <section className="sb-body">
                    <section className='sb-welcome'>
                        <p className='sb-wel sb-mwel'>My Events</p>
                        <p className='sb-kick sb-mkick'>Manage Your Event Participation</p>
                        <p className='sb-mgay'>Stay organized by keeping track of all your registered events. View upcoming and past events, and set reminders so you never miss out!</p>
                    </section>
                    <section className='sb-discover'>
                        <button className='sb-ed' onClick={discoveryClick}><span className='ed-icon'></span> Event Discovery</button>
                        <button className={`sb-me ${isActive ==='myevent'? 'ed-high': ''}`} onClick={eventclick}><span className='me-icon'></span> My Events</button>
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
                                <div className='sb-micon'>
                                    <span>icon</span>
                                    <span>icon</span>
                                </div>
                            </section>
                            <section className='sb-mrevents'>
                                {registeredEvents.length > 0? registeredEvents.map((event) =>{
                                    return <div> </div>
                                }): <span>Not Registered To Any Events!</span>}
                            </section>
                        </section>
                        <section className='sb-mprev'>
                            <header className='sb-mpevent'>
                                <p>Previous Events</p>
                            </header>
                            <section className='sb-mpevents'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </section>
                        </section>
                    </section>
                    <section className='small-footer'>
                        <p>© 2024 UniJam. All rights reserved. Unauthorized use of content and materials is prohibited.</p>
                    </section>
                </section>
    )
}