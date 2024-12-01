import { useRef } from "react";
export default function StudentHome({user, discoveryClick, eventClick}){
    const containerRef = useRef(null);
    const featuredEvent = [1,2,3,4,5,6];
    const registeredEvent = [1,2,3,4,5,6,7,8];
    const handleMouseEnter = (index) => {
        
        const targetDiv = containerRef.current.children[index];
        const container = containerRef.current;

        const containerWidth = container.offsetWidth;
        const targetOffsetLeft = targetDiv.offsetLeft;
        const targetWidth = targetDiv.offsetWidth;

        const targetCenter = targetOffsetLeft + targetWidth / 2;
        const scrollLeft = targetCenter - containerWidth / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
    };
    return(
        <section className="sb-body">
            <section className='sb-welcome'>
                <p className='sb-wel'>Welcome <span>{user.fullname}!</span></p>
                <p className='sb-kick'>Let’s kickstart the day with some exciting events!</p>
            </section>
            <section className='sb-discover'>
                <button className='sb-ed' onClick={discoveryClick}><span className='ed-icon'></span> Event Discovery</button>
                <button className='sb-me' onClick={eventClick}><span className='me-icon'></span>My Events</button>
            </section>
            <section className='sb-featured'>
                <p className='sb-fe'>Featured Events</p>
                <section className='sb-fm' ref={containerRef}>
                    {featuredEvent.map((item, index) => (
                        <div 
                            onMouseEnter={() => handleMouseEnter(index)}
                        >
                        </div>
                    ))}
                </section>
            </section>
            <section className='sb-uregistered'>
                <header className='sb-uheader'>
                    <span className='sb-re'>Upcoming Registered Events</span>
                    <div className='sb-va'>
                        <button className='sb-vab'><span></span>View All</button>
                    </div>
                </header>
                <section className='sb-ur-cont'>
                    {registeredEvent.map((item, index) => (
                        <div 
                            onMouseEnter={() => handleMouseEnter(index)}
                        >
                        </div>
                    ))}
                </section>  
            </section>
            <section className='small-footer'>
                <p>© 2024 UniJam. All rights reserved. Unauthorized use of content and materials is prohibited.</p>
            </section>
        </section>
    )
}