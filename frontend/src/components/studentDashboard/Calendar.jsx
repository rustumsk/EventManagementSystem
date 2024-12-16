import '../../styles/calendar.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Cal(){
  return(
    <div className='cal-cont'>
      <section className='call-sect'>
        <div className='l-cal'> <Calendar/> </div>
        <div className='l-act'>
          <header className='lhead'><span>Today</span> 12/13/2024</header>
          <div className='ltask'></div>
          <div className='ltask'></div>
          <div className='ltask'></div>
          <div className='ltask'></div>
          <div className='ltask'></div>
          <div className='ltask'></div>
          <div className='ltask'></div>
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
            right: 'timeGridWeek,timeGridDay,dayGridMonth' // user can switch between the two
          }}
          events={[{ // this object will be "parsed" into an Event Object
            title: 'Eat A Burger!', // a property!
            start: '2024-12-15', // a property!
            end: '2024-12-16' // a property! ** see important note below about 'end' **
          },{ // this object will be "parsed" into an Event Object
            title: 'And Then Kiss Eulu!', // a property!
            start: '2024-12-15', // a property!
            end: '2024-12-16' // a property! ** see important note below about 'end' **
          },{ // this object will be "parsed" into an Event Object
            title: 'Kiss Ass', // a property!
            start: '2024-12-19', // a property!
            end: '2024-12-20' // a property! ** see important note below about 'end' **
          }]}
        />
        </section>
      </section>
    </div>
  )
}