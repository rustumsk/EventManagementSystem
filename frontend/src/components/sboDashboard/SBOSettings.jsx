import { useState } from "react";
import ProfileSec from "../studentDashboard/studentSettings/profileSec";
import AccountSec from "../studentDashboard/studentSettings/accountSec";
import NotifSec from "../studentDashboard/studentSettings/notifSec";
import '../../styles/components/SBODashboard/sbosettings.scss'
import { motion } from "framer-motion";

export default function SBOSettings({sbo, sboIcon}) {
    const [selected, setSelected] = useState("profile");

    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }} // Initial state (hidden, shifted down)
        animate={{ opacity: 1, y: 0 }} // Final state (visible, original position)
        exit={{ opacity: 0, y: -50 }} // Exit state (hidden, shifted up)
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
        >
        <section className="sb-settings-cont">
            <nav className="sb-lnav">
                <header className="sb-sheader">
                    <span className="sb-settingicon"></span>
                    <span className="sb-sht">Settings</span>
                </header>
                <section
                    className={`sb-sprofile ${selected === "profile" ? "selected" : ""}`}
                    onClick={() => setSelected("profile")}
                >
                    Profile
                </section>
                <section
                    className={`sb-saccount ${selected === "account" ? "selected" : ""}`}
                    onClick={() => setSelected("account")}
                >
                    Account
                </section>
                <section
                    className={`sb-snotif ${selected === "notifications" ? "selected" : ""}`}
                    onClick={() => setSelected("notifications")}
                >
                    Notifications
                </section>
            </nav>
            <section className="sb-rbody">
                <header className="sb-rbody-header">
                    {selected === 'profile' ? (
                        <span>Profile Settings</span>
                    ) : selected === 'account' ? (
                        <span>Account Settings</span>
                    ): selected === 'notifications'? (
                        <span>Notification Settings</span>
                    ):(
                        <div>Invalid Page</div>
                    )}
                </header>
                <section className="sb-spocont">
                    {selected === 'profile' ? (
                        <ProfileSec user={sbo} userIcon={sboIcon}/>
                    ) : selected === 'account' ? (
                        <AccountSec sbo={sbo}/>
                    ): selected === 'notifications'? (
                        <NotifSec />
                    ):(
                        <div>Invalid Page</div>
                    )}
                </section>
            </section>
        </section>
        </motion.div>
    );
}
