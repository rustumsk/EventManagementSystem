import { useState } from "react";
import ProfileSec from "./studentSettings/profileSec";
import AccountSec from "./studentSettings/accountSec";
import NotifSec from "./studentSettings/notifSec";
import { motion } from "framer-motion";
export default function StudentSettings({userIcon, user}) {
    const [selected, setSelected] = useState("profile");

    return (
        <motion.div
            initial={{ x: '10%'}}   // Start just slightly off-screen to the right
            animate={{ x: 0}}       // Slide in to its normal position
            transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.5,  // Subtle and quick
            ease: 'easeOut', // Smooth easing
            }}
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
                        <ProfileSec user={user} userIcon={userIcon}/>
                    ) : selected === 'account' ? (
                        <AccountSec user={user}/>
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
