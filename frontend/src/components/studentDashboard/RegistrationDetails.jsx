import '../../styles/register-details.scss';
import QRCode from "react-qr-code";
import { useNavigate, useLocation } from 'react-router-dom';
import { convertToWritten, extractTimeFromTimestamp } from '../../utils/dateConvert';
import { useRef } from 'react';

export default function RegistrationDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const qrRef = useRef();

    const { event, user, token, participant_id } = location.state || {};
    const date = convertToWritten(new Date(event.event_date));
    const time = extractTimeFromTimestamp(event.event_date);

    const homeClick = () => {
        navigate('/studentdashboard');
    };

    if (!participant_id) {
        navigate('/studentdashboard');
    }

    const downloadQRCode = () => {
        const svg = qrRef.current.querySelector("svg");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Set canvas size
            const padding = 20;
            const fontSize = 20;
            const qrSize = img.width;
            canvas.width = qrSize + padding * 2;
            canvas.height = qrSize + fontSize + padding * 3;

            // Draw background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR code
            ctx.drawImage(img, padding, padding);

            // Add event name
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            const textX = canvas.width / 2;
            const textY = qrSize + padding * 2;
            ctx.fillText(event.event_name, textX, textY);

            // Convert to PNG and download
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngFile;
            downloadLink.download = `qr_code_${event.event_name}+${user.student_name}.png`;
            downloadLink.click();
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    return (
        <div className='rd-body'>
            <section className="rd-cont">
                <header className="rd-header">Thank You For Registering!</header>
                <section className='rd-body'>
                    <div className='rd-qr'>
                        <div className='qr-cont'>
                            <header className='qr-tits'>Your Registration QR Code</header>
                            <div className='qr' ref={qrRef}>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={participant_id.toString()}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <button onClick={downloadQRCode}>Download QR Code</button>
                        </div>
                    </div>
                    <div className='rd-det'>
                        <div className='det-cont'>
                            <section className='det-body'>
                                <header className='body-head'>Event Details</header>
                                <section className='body-bod'>
                                    <p>📅 Date: {date}</p>
                                    <p>🕒 Time: {time}</p>
                                    <p>📍 Location: [Event Location]</p>
                                </section>
                            </section>
                            <footer className='det-foot'>
                                <p>Please keep this QR code handy for easy check-in at the event. Show it at the entrance for quick access.</p>
                            </footer>
                        </div>
                    </div>
                </section>
                <footer className='rd-footer'>
                    <div className='foot-btns'>
                        <button onClick={homeClick}>Home</button>
                        <button>Add to Calendar</button>
                    </div>
                    <div className='foot-reg'>
                        We look forward to seeing you soon! If you have any questions, feel free to reach out to us at ujam0027@gmail.com
                    </div>
                </footer>
            </section>
        </div>
    );
}
