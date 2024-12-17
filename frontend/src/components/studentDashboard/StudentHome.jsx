import { useRef,useState,useEffect } from "react";
import { motion } from "framer-motion";
import { getTopEvent } from "../../services/eventServices/getEvent";
import { convertToWritten, extractTimeFromTimestamp1 } from "../../utils/dateConvert";
import { getEventByStudentId } from "../../services/eventServices/getEvent";
export default function StudentHome({user, discoveryClick, eventClick, userToken}){
    const containerRef = useRef(null);
    const [featuredEvent, setFeaturedEvent] = useState([]);
    const [registeredEvent, setRegisteredEvent] = useState([{}, {}, {}]);
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
    useEffect(() =>{
        const getTops = async() =>{
            try{
                const dat = await getTopEvent();
                const past = await getEventByStudentId(userToken, user.student_id);
                setRegisteredEvent(past);
                setFeaturedEvent(dat);
            }catch(e){
                console.log(e);
            }
        }
        getTops();
    },[])
    return(
        <motion.div
            initial={{ x: '-10%'}}  
            animate={{ x: 0}}       
            transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.5,   
            ease: 'easeOut',
            }}
        >
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
                    {featuredEvent.length > 0?featuredEvent.map((item, index) => (
                        <div 
                            onMouseEnter={() => handleMouseEnter(index)}
                             className="fmd"
                        >
                            <header className="fmdh">{item.event_name}</header>
                            <p className="fmdp"><strong>Date:</strong>{convertToWritten(new Date(item.event_date))}</p>
                            <p className="fmdp"><strong>Time:</strong>{`${extractTimeFromTimestamp1(item.start_time)} - ${extractTimeFromTimestamp1(item.end_time)}`}</p>
                            <p className="fmdp"><strong>Location:</strong>Cebu City</p>
                            <p className="fmdp"><strong>Category:</strong> Trade</p>
                            <footer className="fmdi">
                                <div className="i" style={{ backgroundColor: "#6C7A89" }}></div>
                                <div className="i" style={{ backgroundColor: "#34495E" }}></div>
                                <div className="i" style={{ backgroundColor: "#95A5A6" }}></div>
                                <div className="i">123</div>
                            </footer>
                        </div>
                    )):<span>No Featured Events Available!</span> }
                    
                </section>
            </section>
            <section className='sb-uregistered'>
                <header className='sb-uheader'>
                    <span className='sb-re'>Upcoming Registered Events</span>
                    <div className='sb-va'>
                        <button className='sb-vab' onClick={eventClick}><span></span>View All</button>
                    </div>
                </header>
                <section className='sb-ur-cont'>
                    {registeredEvent.length > 0?registeredEvent.map((item, index) => (
                        <div 
                        onMouseEnter={() => handleMouseEnter(index)}
                         className="sb"
                    >
                        <header className="sbh">{item.event_name}</header>
                        <p className="sbp"><strong>Date:</strong>{convertToWritten(new Date(item.event_date))}</p>
                        <p className="sbp"><strong>Time:</strong>{`${(item.start_time)} - ${item.end_time}`}</p>
                        <p className="sbp"><strong>Location:</strong>Cebu City</p>
                        <p className="sbp"><strong>Category:</strong> Trade</p>
                        <footer className="sbi">
                            <div className="i" style={{ backgroundColor: "#6C7A89" }}></div>
                            <div className="i" style={{ backgroundColor: "#34495E" }}></div>
                            <div className="i" style={{ backgroundColor: "#95A5A6" }}></div>
                            <div className="i">123</div>
                        </footer>
                    </div>
                    )): <span>No Upcoming Registered Events!</span>}
                </section>  
            </section>
            <section className='small-footer'>
                <p>© 2024 UniJam. All rights reserved. Unauthorized use of content and materials is prohibited.</p>
            </section>
        </section>
        </motion.div>
    )
}