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
  const fields = event.custom_fields;
  const [customResponse, setCustomResponse] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer); 
  }, []);

  const setCustomValues = (infor, value) => {
    setCustomResponse((prev) => {
      const existingIndex = prev.findIndex((item) => item.for === infor);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].respo = value;
        return updated;
      }

      return [...prev, { for: infor, respo: value }];
    });

    console.log(customResponse); 
  };

  const handleCheckboxChange = (label, value, checked) => {
    setCustomResponse((prev) => {
      const existingIndex = prev.findIndex((item) => item.for === label);
  
      if (existingIndex !== -1) {
        const updated = [...prev];
        const currentValues = updated[existingIndex].respo || [];
  
        if (checked) {
          // Add the value only if it's not already in the array
          if (!currentValues.includes(value)) {
            updated[existingIndex].respo = [...currentValues, value];
          }
        } else {
          updated[existingIndex].respo = currentValues.filter((val) => val !== value);
        }
  
        return updated;
      }
  
      return [...prev, { for: label, respo: checked ? [value] : [] }];
    });
  
    console.log(customResponse);  // You might want to check if it's showing the updated state properly
  };

  const handleRadioChange = (label, value) => {
    setCustomResponse((prev) => {
      const existingIndex = prev.findIndex((item) => item.for === label);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].respo = value;
        return updated;
      }

      return [...prev, { for: label, respo: value }];
    });

    console.log(customResponse); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      event_id: event.event_id,
      student_id: user.student_id,
      custom_responses: JSON.stringify(customResponse)
    };

    try {
      setLoading(true);
      const result = await createParticipant(token, data);
      console.log(result);
      setLoading(false);
      navigate('/registerdetails', { state: { event, user, token, participant_id: result } });
    } catch (e) {
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
            value={user.fullname}
            readOnly
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.student_email}
            placeholder="Enter your email address"
            readOnly
          />

          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={user.student_id}
            placeholder="Enter your student ID"
            readOnly
          />

          {fields.map((obj) => {
            if (obj.type === 'text') {
              return (
                <>
                  <label htmlFor={obj.main_label}>{obj.main_label}</label>
                  <input
                    type="text"
                    name={obj.main_label}
                    onChange={(e) => setCustomValues(obj.main_label, e.target.value)}
                    placeholder="Enter your response"
                  />
                </>
              );
            } else if (obj.type === 'checkbox') {
              return (
                <>
                  <label htmlFor={obj.main_label}>{obj.main_label}</label>
                  {obj.boxes.map((box, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`${obj.main_label}-${box.value}`} 
                        name={obj.main_label}
                        value={box.value}
                        onChange={(e) => handleCheckboxChange(obj.main_label, box.value, e.target.checked)} 
                      />
                      <label htmlFor={`${obj.main_label}-${box.value}`}>{box.value}</label>
                    </div>
                  ))}
                </>
              );
            } else if (obj.type === 'radio') {
              return (
                <>
                  <label htmlFor={obj.main_label}>{obj.main_label}</label>
                  {obj.inps.rads.map((rad, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`${obj.main_label}-${rad.rlabel || rad.nlabel}`}
                        name={obj.main_label}
                        value={rad.rlabel || rad.nlabel}
                        onChange={(e) => handleRadioChange(obj.main_label, e.target.value)}
                      />
                      <label htmlFor={`${obj.main_label}-${rad.rlabel || rad.nlabel}`}>
                        {rad.rlabel || rad.nlabel}
                      </label>
                    </div>
                  ))}
                </>
              );
            }
            return null;
          })}
          <button type="submit">Register</button>
        </form>

        <div className="footer">© 2024 UniJam. All rights reserved.</div>
      </div>
    </section>
  );
}
