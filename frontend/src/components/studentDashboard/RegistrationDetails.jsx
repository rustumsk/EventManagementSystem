import '../../styles/register-details.scss';
import QRCode from "react-qr-code";
import { useNavigate, useLocation } from 'react-router-dom';
import { convertToWritten,extractTimeFromTimestamp} from '../../utils/dateConvert';

export default function RegistrationDetails(){
    const navigate = useNavigate();
    const location = useLocation();

    const { event, user, token, participant_id } = location.state || {};
    const date = convertToWritten(new Date(event.event_date));
    const time = extractTimeFromTimestamp(event.event_date);
    const homeClick = () =>{
        navigate('/studentdashboard');
    }
    if (!participant_id){
        navigate('/studentdashboard');
    }
    return(
        <div className='rd-body'>
            <section className="rd-cont">
                <header className="rd-header">Thank You For Registering!</header>
                <section className='rd-body'>
                    <div className='rd-qr'>
                        <div className='qr-cont'>
                            <header className='qr-tits'>Your Registration Qr Code</header>
                            <div className='qr'>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={participant_id.toString()}
                                viewBox={`0 0 256 256`}
                            />
                            </div>
                        </div>
                    </div>
                    <div className='rd-det'>
                        <div className='det-cont'>
                            {console.log(participant_id)};
                            {console.log(event)}
                            <section className='det-body'>
                                <header className='body-head'>Event Details</header>
                                <section className='body-bod'>
                                    <p>📅 Date:                      {date}       </p>
                                    <p>🕒 Time:                      {time}   </p>
                                    <p>📍 Location:             [Event Location]</p>
                                </section>
                            </section>
                            <footer className='det-foot'><p>Please keep this QR code handy for easy check-in at the event. Show it at the entrance for quick access.</p></footer>
                        </div>
                    </div>
                </section>
                <footer className='rd-footer'>
                    <div className='foot-btns'>
                        <button onClick={homeClick}>Home</button>
                        <button>Add to Calendar</button>
                    </div>
                    <div className='foot-reg'>We look forward to seeing you soon! If you have any questions, feel free to reach out to us at ujam0027@gmail.com</div>
                </footer>
            </section>
        </div>
    )
}