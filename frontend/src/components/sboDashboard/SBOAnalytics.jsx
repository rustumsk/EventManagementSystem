
import '../../styles/components/SBODashboard/analcont.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer, PieChart, Pie, Sector, Cell, } from 'recharts';
import { BarChart, Bar, Rectangle,  Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { getEventById } from '../../services/eventServices/getEvent';
import { getAllParticipant, getAverage, getAverage1, getChecked, getuChecked, getAllPart } from '../../services/participantServices/getParticipant';
import { getAverageFeedback, getAverageFeedbackByEventId } from '../../services/feedbackServices/getFeedback';
import { convertToWritten } from '../../utils/dateConvert';
import { motion } from "framer-motion";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function Analytics({authToken,sbo}){
      const [totalEvents, setTotalEvents] = useState(0);
      const [attend,setAttend] = useState(0);
      const [show, setShow] = useState(0);
      const COLORS = ['#6C23B5', '#FEE17B'];
      const [totalParticipants, setTotalParticipants] = useState(0);
      const [averageFeed, setAverageFeed] = useState(0);
      const [barData, setBarData] = useState([]);
      const [overView, setOverView] = useState([]);
      const [areaData, setAreaData] = useState([
        { date: "January", participants: 0 },
        { date: "February", participants: 0 },
        { date: "March", participants: 0 },
        { date: "April", participants: 0 },
        { date: "May", participants: 0 },
        { date: "June", participants: 0 },
        { date: "July", participants: 0 },
        { date: "August", participants: 0 },
        { date: "September", participants: 0 },
        { date: "October", participants: 0 },
        { date: "November", participants: 0 },
        { date: "December", participants: 0 },
      ]);

      const pieData = [
        { name: 'Group A', value: attend },
        { name: 'Group B', value: show },
      ];

      const downloadExcel = () => {
        const ws_overview = XLSX.utils.json_to_sheet(overView);
        const ws_barData = XLSX.utils.json_to_sheet(barData);
        const ws_areaData = XLSX.utils.json_to_sheet(areaData);
        
        const wb = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(wb, ws_overview, 'Event Overview');
        XLSX.utils.book_append_sheet(wb, ws_barData, 'Feedback Data');
        XLSX.utils.book_append_sheet(wb, ws_areaData, 'Registration Trends');
    
        // Write and download the file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelFile = new Blob([excelBuffer], { bookType: 'xlsx', type: 'application/octet-stream' });
        saveAs(excelFile, 'analytics_report.xlsx');
    };
      useEffect(() => {
        const getEvent = async () => {
            try {
                const data = await getEventById(authToken, sbo.sbo_id);
                setTotalEvents(data.length);
    
                const tp = await getAllParticipant(sbo.sbo_id);
                setTotalParticipants(tp.length);
    
                const av = await getAverage(sbo.sbo_id);
                setAttend(av.length);
    
                const av1 = await getAverage1(sbo.sbo_id);
                setShow(av1.length);
    
                console.log("Hi");
                const a = await getAverageFeedback(sbo.sbo_id);
                setAverageFeed(a);
    
                const da = await getEventById(authToken, sbo.sbo_id);
                console.log(da);
    
                const barDataPromises = da.map(async (event) => {
                    const aver = await getAverageFeedbackByEventId(event.event_id);
                    return { name: event.event_name, rating: aver };
                });
    
                const overViewPromises = da.map(async (event) => {
                    const pC = await getChecked(event.event_id);
                    const pU = await getuChecked(event.event_id);
                    const af = await getAverageFeedbackByEventId(event.event_id);
                    return {
                        event_name: event.event_name,
                        date: convertToWritten(new Date(event.event_date)),
                        attended: pC.length,
                        no_show: pU.length,
                        rate: `${(pC.length / (pC.length + pU.length) * 100)}%`,
                        avef: af
                    };
                });
    
                const bd = await Promise.all(barDataPromises);
                const overViewObj = await Promise.all(overViewPromises);
    
                setBarData(bd);
                setOverView(overViewObj);
    
                const updatedData = [...areaData]; 
                for (const event of da) {
                    const date = new Date(event.event_date);
                    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
                    const dat = await getAllPart(event.event_id);
    
                    const monthIndex = updatedData.findIndex((item) => item.date === monthName);
                    if (monthIndex !== -1) {
                        updatedData[monthIndex].participants += dat.length;
                    }
                }
                setAreaData(updatedData);
    
            } catch (e) {
                console.log(e);
            }
        };
        getEvent();
    }, []);
    return(
        <motion.div
        initial={{ opacity: 0, y: 50 }} // Initial state (hidden, shifted down)
        animate={{ opacity: 1, y: 0 }} // Final state (visible, original position)
        exit={{ opacity: 0, y: -50 }} // Exit state (hidden, shifted up)
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
        >
        <div className="anal-cont">
            <header className='anal-head'>
                <div className='anal-tit'><span>Report Anayltics</span></div>
                <div className='anald'>
                    <div className='anald-cont' onClick={downloadExcel}>
                        <span className='anal-dicon'></span>
                        <span className='anal-drep' onClick={downloadExcel}>Download Reports</span>
                    </div>
                </div>
            </header>
            <section className='tot-reg'>
                <div className='tot-reg-cont'>
                    <div>
                        <span>Total Registrations</span>
                        <p className='tre'>{totalParticipants}</p>
                    </div>
                    <div>
                        <span>Total Events</span>
                        <p className='tre'>{totalEvents}</p>
                    </div>
                    <div>
                        <span>Attendance Rate</span>
                        <p className='ar'>{`${(attend/(attend+show)) * 100}%`}</p>
                    </div>
                    <div>
                        <span>Feedback Score</span>
                        <p className='fs'>{averageFeed}/5</p>
                    </div>
                </div>
            </section>
            <section className='big-tot'>
                <section className='bl'>
                    <section className='bl-up'>
                        <div className='bl-ocont'>
                            <div className='bl-mcont'>
                                <header className='mcont-head'>Registration Trends</header>
                                <div className='mcont-cont'>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                    width={500}
                                    height={400}
                                    data={areaData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="participants" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='bl-down'>
                    <div className='bl-down-ocont'>
                        <div className='bl-down-mcont'>
                            <div className='down-mcont-head'>All Events Overview</div>
                            <div className='events-table-container'>
                                <table className='events-table'>
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Date</th>
                                            <th>Attended</th>
                                            <th>Attended</th>
                                            <th>Attendance Rate</th>
                                            <th>Feedback Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {overView.length ? overView.map(over => (
                                        <tr key={over.event_name}>
                                            <td>{over.event_name}</td>
                                            <td>{over.date}</td>
                                            <td>{over.attended}</td>
                                            <td>{over.no_show}</td>
                                            <td>{over.rate}</td>
                                            <td>{over.avef}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6">No data available</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </section>
                </section>
                <section className='sl'>
                    <div className="sl-up">
                        <div className='sl-up-ocont'></div>
                        <div className='sl-up-mcont'>
                            <header className='up-header'>Overall Attendance Summary</header>
                            <div className='up-bchart'>
                                <div className='pchart'>
                                <PieChart width={300} height={350}>
                                    <Pie
                                        data={pieData}
                                        cx={150}
                                        cy={200}
                                        innerRadius={70}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                        fill="#8884d8"
                                    >
                                        {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                                </div>
                                
                                <div className='pchart-anal'>
                                    <div>
                                        <p>Attendees: {attend}</p>
                                        <p>No-Shows: {show}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sl-down">
                        <div className='sl-down-ocont'></div>
                        <div className='sl-down-mcont'>
                            <div className="down-head">
                                Feedback Overview
                            </div>
                            <div className='down-chart'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                width={500}
                                height={300}
                                data={barData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="rating" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                </BarChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
        </motion.div>
    )   
}