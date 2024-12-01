import { useState } from "react";

export default function NotifSec() {
    const [settings, setSettings] = useState({
        eventReminders: true,
        updates: true,
        announcements: false,
        smsAlerts: true,
        pushNotifications: true,
    });

    const handleToggle = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic for notification settings
        alert("Notification settings updated!");
    };

    return (
        <section className="notif-section">
            <form onSubmit={handleSubmit} className="notif-form">
                <header className="notif-header">
                    <h2>Notifications</h2>
                    <p>This is where you'll receive notifications</p>
                </header>
                <div className="notif-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.eventReminders}
                            onChange={() => handleToggle("eventReminders")}
                        />
                        Event Reminders
                    </label>
                    <p>Notifies you of upcoming events you are registered for.</p>
                </div>
                <div className="notif-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.updates}
                            onChange={() => handleToggle("updates")}
                        />
                        Updates
                    </label>
                    <p>Sends updates about changes to events or system features.</p>
                </div>
                <div className="notif-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.announcements}
                            onChange={() => handleToggle("announcements")}
                        />
                        Announcements
                    </label>
                    <p>
                        Alerts you to important announcements (e.g., new events,
                        policy changes).
                    </p>
                </div>
                <div className="notif-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.smsAlerts}
                            onChange={() => handleToggle("smsAlerts")}
                        />
                        SMS Alerts
                    </label>
                    <p>Receive alerts via SMS.</p>
                </div>
                <div className="notif-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.pushNotifications}
                            onChange={() => handleToggle("pushNotifications")}
                        />
                        Push Notifications
                    </label>
                    <p>Enable or disable push notifications for the mobile app.</p>
                </div>
                <button type="submit" className="confirm-button">
                    Confirm Changes
                </button>
            </form>
        </section>
    );
}