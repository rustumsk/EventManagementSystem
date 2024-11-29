export default function StudentDiscover({isActive, discoveryClick, eventclick}){
    return(
        <section className="sb-body">
                    <section className='sb-welcome'>
                        <p className='sb-ds'>Discover Exciting Events!</p>
                        <p className='sb-en'>Join us to engage, learn, and network with your peers at our upcoming events."</p>
                    </section>
                    <section className='sb-discover'>
                        <button className={`sb-ed ${isActive ==='discovery'? 'ed-high': ''}`} onClick={discoveryClick}><span className='ed-icon'></span> Event Discovery</button>
                        <button className='sb-me' onClick={eventclick}><span className='me-icon'></span> My Events</button>
                    </section>
                    <section className="sb-search">
                    <div className="sb-search-wrapper">
                        <span className="sb-search-icon">⌕</span>
                        <input type="text" placeholder="Search Events" />
                    </div>
                </section>
                    <section className='sb-ediscover'>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                            <div className="sb-devents"></div>
                    </section>
                    <section className='small-footer'>
                        <p>© 2024 UniJam. All rights reserved. Unauthorized use of content and materials is prohibited.</p>
                    </section>
                </section>
    )
}