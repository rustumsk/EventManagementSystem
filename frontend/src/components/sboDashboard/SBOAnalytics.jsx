
import '../../styles/components/SBODashboard/analcont.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer, PieChart, Pie, Sector, Cell, } from 'recharts';
import { BarChart, Bar, Rectangle,  Legend } from 'recharts';

export default function Analytics(){
    const pieData = [
        { name: 'Group A', value: 800 },
        { name: 'Group B', value: 200 },
      ];
      const COLORS = ['#6C23B5', '#FEE17B'];
      const barData = [
        {
          name: 'Venue',
          feedback: 4.5,
        },
        {
          name: 'Organization',
          feedback: 5,
        },
        {
          name: 'Content',
          feedback: 4,
        },
        {
          name: 'Speakers',
          feedback: 4.5,
        },
        {
          name: 'Networking',
          feedback: 5,
        },
        {
          name: 'Solutions',
          feedback: 5,
        },
    ];
      
    const data = [
        {
          name: 'July',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'August',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'September',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'October',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'November',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'December',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'January',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      
    return(
        <div className="anal-cont">
            <header className='anal-head'>
                <div className='anal-tit'><span>Report Anayltics</span></div>
                <div className='anald'>
                    <div className='anald-cont'>
                        <span className='anal-dicon'>Icon</span>
                        <span className='anal-drep'>Download Reports</span>
                    </div>
                </div>
            </header>
            <section className='tot-reg'>
                <div className='tot-reg-cont'>
                    <div>
                        <span>Total Registrations</span>
                        <p className='tre'>1k</p>
                    </div>
                    <div>
                        <span>Total Events</span>
                        <p className='tre'>25</p>
                    </div>
                    <div>
                        <span>Attendance Rate</span>
                        <p className='ar'>80%</p>
                    </div>
                    <div>
                        <span>Feedback Score</span>
                        <p className='fs'>4.5/5</p>
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
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
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
                                        <tr>
                                            <td>Intramurals</td>
                                            <td>01/08/2024</td>
                                            <td>80</td>
                                            <td>100</td>
                                            <td>80%</td>
                                            <td>4.5/5</td>
                                        </tr>
                                        <tr>
                                            <td>Sports Day</td>
                                            <td>02/04/2024</td>
                                            <td>300</td>
                                            <td>350</td>
                                            <td>85%</td>
                                            <td>4/5</td>
                                        </tr>
                                        <tr>
                                            <td>Face of CCS</td>
                                            <td>08/08/2024</td>
                                            <td>120</td>
                                            <td>180</td>
                                            <td>20%</td>
                                            <td>5/5</td>
                                        </tr>
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
                                        <p>Attendees: 80</p>
                                        <p>No-Shows: 20</p>
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
                                <Bar dataKey="feedback" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                </BarChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )   
}