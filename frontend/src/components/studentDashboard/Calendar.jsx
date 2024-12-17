import '../../styles/calendar.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { convertToWritten } from '../../utils/dateConvert';

export default function Cal({}){
  const location = useLocation();
  const navigate = useNavigate();
  const [forCalendar, setForCalendar] = useState([]);
  const [forActs, setForActs] = useState([]);
  if(location.state == null){
    navigate('/studentlogin');
    return;
  }
  const {events} = location.state;
  console.log(events);

  useEffect(() =>{
    const setFor = () =>{
      const cal = [];
      const ft = [];
      events.map(event =>{
        const newDate = new Date(new Date(convertToWritten(new Date(event.event_date))).setDate(new Date(event.event_date).getDate() + 1));
        const obj = {
          title: event.event_name,
          start: newDate.toISOString().split('T')[0]
        }
        const o = {
          task: event.event_description
        }
        ft.push(o);
        cal.push(obj);
      })
      setForActs(ft);
      setForCalendar(cal);
    }
    setFor();
  },[])
  return(
    <div className='cal-cont'>
      <section className='call-sect'>
        <div className='l-cal'> <Calendar/> </div>
        {console.log(forCalendar)}
        <div className='l-act'>
          <header className='lhead'><span>All Events</span> </header>
          {forActs.length > 0? forActs.map(act =>{
            return <div className='ltask'>{act.task}</div>
          }): null}
        </div>
      </section>
      <section className='calr-sect'>
        <header className='r-head'>CALENDAR</header>
        <section className='r-calendar'>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth' 
          }}
          events={forCalendar}
        />
        </section>
      </section>
    </div>
  )
}