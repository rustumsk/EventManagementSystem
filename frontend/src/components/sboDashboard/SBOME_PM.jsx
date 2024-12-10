import '../../styles/components/SBODashboard/sbome_pm.scss';
import notifImage from "../../assets/SBOD_Logos/notifications.png";
import searchImage from "../../assets/SBOD_Logos/search.png";
import delImage from "../../assets/SBOD_Logos/del_icon.png";
import editImage from "../../assets/SBOD_Logos/edit_icon.png";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

function SBOME_PM () {
  const [showScanner, setShowScanner] = useState(false);

  const handleNotificationClick = () => {
    alert("Sup bitch");
  };

  const handleScanQRClick = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };
  const qrOnScan = (result) =>{
    console.log(result[0].rawValue);
  }

  return(
    <div className="sbome-pm-main-container">
      <section className="sbome-pm-back">
        <section className="sbome-pm-front">
          <div className="sbome-pm-content">
            <div className="sbome-pm-content">
              {/* HEADER AND INPUT */}
              <header className="sbome-header">
                <h4>Participant Management for</h4>
                <h1 style={{ color: "#6C23B5", fontSize: "30px", fontFamily: "Righteous", fontWeight: "normal"}}>“ Intramurals Sports Festival “</h1>
                <div className="sbome-search">
                  <div style={{ position: "relative"}}>
                    <img src={searchImage} alt="Search Icon" className="sbome-imglogo"/>
                    <input type="text" placeholder="Search"/>
                  </div>
                  <button className="sbome-qr-btn" onClick={handleScanQRClick}>Scan QR Code</button>
                  <div>
                    <img src={delImage} className="sbome-logos-design"></img>
                    <img src={editImage} className="sbome-logos-design"></img>
                  </div>
                </div>
              </header>

              {/* MAIN DATA */}
              <main className="sbome-list">
                <div className="sbome-titles">
                  <p>Name</p>
                  <p>Status</p>
                  <p>Registration Date</p>
                  <p>Check-In Time</p>
                  <p>Actions</p>
                </div>
                <div className="sbome-datas">
                  <p>Jane Cooper</p>
                  <p>Checked-In</p>
                  <p>March 1,2025</p>
                  <p>09:17 AM</p>
                  <button className="sbome-undo-btn">Undo</button>
                </div>
              </main>
            </div>

            {/* SIDE CONTENTS */}
            <div className="sbome-pm-sidecontent">
              <div className="sbome-notif-logo-container">
                <p style={{ cursor: "pointer" }} onClick={handleNotificationClick}>Set reminder</p>
                <img src={notifImage} alt="Notification Icon" className="sbome-notif-logo" onClick={handleNotificationClick} />
              </div>
              <section className="sbome-participants">
                <h2>Participants</h2>
              </section>
              <section className="sbome-comments-container">
                <h2>Comments</h2>
                <div className="sbome-comments">
                  <p>Jane Cooper</p>
                  <p>⭐⭐⭐⭐⭐</p>
                  <p style={{ fontSize: "10px" }}>Rated 5.0/5.0 by participants</p>
                  <p>“Amazing event! Well-organized and fun.”</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </section>

      {/* Scanner Overlay */}
      {showScanner && (
        <div className="scanner-overlay">
          <div className="scanner-container">
            <Scanner onScan={qrOnScan} />
            <button className="scanner-close-btn" onClick={closeScanner}>Close</button>
          </div>
        </div>
      )}
      <section className="sbome-pm-cb-container">
        <button className="sbome-pm-cc-btn">Close Check Ins</button>
      </section>
    </div>
  );
}

export default SBOME_PM;