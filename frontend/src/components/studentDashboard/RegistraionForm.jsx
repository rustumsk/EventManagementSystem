import React, { useState } from 'react';
import '../../styles/registration-form.scss';
import { useLocation } from 'react-router-dom';

export default function RegistrationForm({ }) {
  const location = useLocation();
  const {event, user} = location.state || {};
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    customSports: '',
    emergencyContact: '',
    yearLevel: '',
    course: '',
    volunteer: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <section className="rf-container">
      {console.log(user)}
      {console.log(event)};
      <div className="rf">
        <h2>Event Registration Form</h2>
        <div className='rf-d'>
            <p className='pi'>Participant Information</p>
            <p>Please fillout the forms below if applicable!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullname}
            onChange={handleChange}
            readOnly
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.student_email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />

          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={user.id_num}
            onChange={handleChange}
            placeholder="Enter your student ID"
          />

          <button type="submit">Register</button>
        </form>
        
        <div className="footer">
          © 2024 UniJam. All rights reserved.
        </div>
      </div>
    </section>
  );
}
