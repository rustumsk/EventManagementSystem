import React, { useState, useEffect } from 'react';
import '../../styles/registration-form.scss';
import { useLocation } from 'react-router-dom';
import { createParticipant } from '../../services/participantServices/createParticipant';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, user, token } = location.state || {};
  const [formData, setFormData] = useState({
    fullName: user.fullname,
    email: user.student_email,
    studentId: user.id_num,
    customSports: '',
    emergencyContact: '',
    yearLevel: '',
    course: '',
    volunteer: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer); 
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      event_id: event.event_id,
      student_id: user.student_id,
    }
    try{
      setLoading(true);
      const result = await createParticipant(token, data);
      console.log(result);
      setLoading(false);
      navigate('/registerdetails',{state: {event: event, user:user, token:token, participant_id: result}});
    }catch(e){
      console.log(e);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <section className="rf-container">
      <div className="rf">
        <h2>Event Registration Form</h2>
        <div className="rf-d">
          <p className="pi">Participant Information</p>
          <p>Please fill out the forms below if applicable!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            readOnly
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />

          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter your student ID"
          />

          <button type="submit">Register</button>
        </form>

        <div className="footer">© 2024 UniJam. All rights reserved.</div>
      </div>
    </section>
  );
}
