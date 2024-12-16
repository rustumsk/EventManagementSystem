import '../../styles/components/SBODashboard/sbocreateevent.scss';
import React, { useEffect, useState } from "react";
import getCategory from '../../services/categoryServices/getCategory';
import convertUrl from '../../services/helper/convertFiletoUrl';
import createEvent from '../../services/eventServices/createEvent';
import createLocation from '../../services/locationServices/locationCreation';
import getCategoryId from '../../services/categoryServices/getCategoryId';
import draftCreation from '../../services/draftServices/draftCreation';
import { getEventByIdNameDate } from '../../services/eventServices/getEvent';
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';

const SBOCreateEvent = ({sbo, sboToken}) => {
  const step = 1;
  const [currentStep, setCurrentStep] = useState(step);
  const [isChecked, setIsChecked] = useState(false);
  
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventOverview, setEventOverview] = useState("");
  const [eventDDate, setEventDDate] = useState("");
  const [eventDTime,setEventDTime] = useState("");
  const [eventPic, setEventPic] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [fieldLabel, setFieldLabel] = useState("Default Label");
  const [fieldType, setFieldType] = useState("text");
  const [placeholder, setPlaceholder] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [draftName, setDraftName] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [draftError, setDraftError] = useState(" ")
  const [end,setEnd] = useState("");
  const [categories, setCategories] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [eventType, setEventType] = useState('');
  const [draftModal, setDraftModal] = useState(false);
  const [boxName, setBoxName] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
//   const [sam, setSam] = useState([
//     {
//         type: 'text',
//         main_label: 'Input Type',
//         inps: {
//             inp: 'text',
//             place_holder: 'placeholder',
//         },
//     },
//     {
//         type: 'radio',
//         main_label: 'Radio Type',
//         inps: {
//             inp: 'radio',
//             n: 'option',
//             rads: [
//                 { rlabel: 'YES' },
//                 { nlabel: '123' },
//             ],
//         },
//     },
//     {
//       type: 'checkbox',
//       main_label: 'Fav Foods',
//       boxes:[
//         {value: 'penis'},
//         {value: 'dick'},
//         {value: 'puthy'},
//       ]
//   }
// ]);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  const handleOpen = () =>{
    setOpenAdd(!openAdd);
  }
  const deleteField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };
  const renderInput = (obj, index) =>{
    if (obj.type === 'text'){
      return(
        <div className='inpdiv'>
          <div className='lab-cont'>
            <label htmlFor="" className='lab'>{obj.main_label}</label>
            <input type={obj.inps.inp} className='txtinp' placeholder={obj.inps.placeholder}/>
          </div>
          <div className='lbtn-cont'>
            <span className='dlb' onClick={() => deleteField(index)}></span>
            <span className='eb'></span>
          </div>
        </div>
      )
    }
    else if (obj.type === 'radio'){
      return(
        <div className='inpdiv'>
          <div className='lab-cont'>
            <label htmlFor="" className='lab rd'>{obj.main_label}</label>
            <div className="radio-cont">
              <label htmlFor="yes" className="radio-label">
                {obj.inps.rads[0].rlabel}
                <input type={obj.inps.type} className="radinp" id="yes" name={obj.inps.n}  />
              </label>
              <label htmlFor="no" className="radio-label">
                {obj.inps.rads[1].nlabel}
                <input type={obj.inps.type} className="radinp" id="no" name={obj.inps.n} />
              </label>
            </div>
          </div>        
          <div className='lbtn-cont'>
            <span className='dlb' onClick={() => deleteField(index)}></span>
            <span className='eb'></span>
          </div>
        </div>
      )
    }
    else if (obj.type ==='checkbox') {
      return(
        <div className='inpdiv'>
                  <div className='lab-cont'>
                    <label htmlFor="" className='lab cb'>{obj.main_label}</label>
                  
                    <div className='check-cont'>
                      {obj.boxes.map((box, index) => {
                        return(
                          <div className='check'>
                            <input type="checkbox" name="checks" id={`${obj.main_label}${index}`} value={box.value} className='c'/>
                            <label htmlFor="food1">{box.value}</label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className='lbtn-cont'>
                    <span className='dlb' onClick={() => deleteField(index)}></span>
                    <span className='eb'></span>
                  </div>
          </div>
      )
    }
  }
  const handleEventTypeChange = (e) => {
    const value = e.target.value;
    setEventType(value);
    console.log(eventType);
    
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        eventType: "Please select an event type.",
      }));
    } else {
      setErrors((prevErrors) => {
        const { eventType, ...rest } = prevErrors;
        return rest;
      });
    }
  };
  const pStyle = {
    fontSize: "13px",
  };
  const handleDraftModal = () =>{
    const validateInputs = () => {
      const newErrors = {};
  
      if (!eventName.trim()) {
        newErrors.eventName = "Event name is required.";
      } else if (eventName.length < 3) {
        newErrors.eventName = "Event name must be at least 3 characters.";
      }
  
      if (!eventDate) {
        newErrors.eventDate = "Event date is required.";
      }
  
      if (!eventTime) {
        newErrors.eventTime = "Event Start Time is required.";
      }
      if (!end){
        newErrors.eventEnd = "Event End Time is required!";
      }
      if (!eventLocation.trim()) {
        newErrors.eventLocation = "Event location is required.";
      }
  
      if (!eventCity) {
        newErrors.eventCity = "Please select a city.";
      }
  
      if (!eventOverview.trim()) {
        newErrors.eventOverview = "Event overview is required.";
      } else if (eventOverview.length < 10) {
        newErrors.eventOverview = "Event overview must be at least 10 characters.";
      }
  
      if (!eventPic) {
        newErrors.eventPic = "Please upload a file.";
      } else {
        const validFileTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validFileTypes.includes(eventPic.type)) {
          newErrors.eventPic = "Invalid file type. Only JPEG, PNG, and PDF are allowed.";
        }
        const maxFileSize = 2 * 1024 * 1024; // 2MB
        if (eventPic.size > maxFileSize) {
          newErrors.eventPic = "File size exceeds 2MB.";
        }
      }
  
      if (!eventCategory) {
        newErrors.eventCategory = "Please select a category.";
      }
  
      if (!eventDDate) {
        newErrors.eventDDate = "Please select a registration deadline date.";
      } else if (new Date(eventDDate) < new Date()) {
        newErrors.eventDDate = "Deadline date cannot be in the past.";
      }
  
      if (!eventDTime) {
        newErrors.eventDTime = "Please select a registration deadline time.";
      }
  
      if (!eventCapacity || isNaN(eventCapacity) || eventCapacity <= 0) {
        newErrors.eventCapacity = "Capacity must be a valid positive number.";
      }
      
      if (!eventType){
        newErrors.eventType = "Please choose the event type!";
      }
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
    const validationPassed = validateInputs();
    if (!validationPassed){
        alert("Please fill up the forms in the previous steps!");
        return;
    }; 

    setDraftModal(!draftModal);
  }
  const handleSaveBox = () =>{

    if(!boxName){
      toast.error("Field Should Not Be Empty!");
      return;
    }
    if (boxes.find(box => boxName === box.value)){
      toast.error("Option Already Exists!");
      return;
    }
    const box = {value: boxName};

    setBoxes([...boxes, box]);
    setOpenAdd(!openAdd);
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    setFieldLabel('Default Label');
    setFieldType('text');
    setPlaceholder("");
    setBoxes([]);
  };
  const handleFileInput = (e) =>{
    setEventPic(e.target.files[0]);
  };

  const handleSave = () => {
    if (fieldType === 'text'){
      console.log("Text Bro!");
      const input = {
            type: 'text',
            main_label: fieldLabel,
            inps: {
                inp: 'text',
                placeholder: placeholder
            },
        }
      setFields([...fields, input]);
    }
    else if (fieldType === 'radio'){
      const radio = {
        type: 'radio',
        main_label: fieldLabel,
        inps:{
          inp: 'radio',
          n: 'option',
          rads:[
            {rlabel: "YES"},
            {nlabel: "NO"}
          ]
        }
      }
      setFields([...fields, radio]);
    }
    else if (fieldType === 'checkbox'){
      if (!boxes.length > 0){
        toast.error("Options should not be empty!");
        return;
      }
      const b = {
        type: 'checkbox',
        main_label: fieldLabel,
        boxes: boxes
      }
      console.log(boxes);
      setFields([...fields, b]);
      console.log(fields);
    }
    console.log(fields);
    setModalOpen(false);
  };

  const validateStep = (currentStep) => {
    const errors = {};

    if (currentStep === 1) {
      if (!eventName.trim()) {
        errors.eventName = "Event Name is required.";
      }
      if (!eventDate) {
        errors.eventDate = "Event Date is required.";
      }
      if (!eventTime) {
        errors.eventTime = "Event Start Time is required.";
      }
      if (!end) {
        errors.end = "Event End Time is required!";
      }
      if (!eventLocation.trim()) {
        errors.eventLocation = "Event Location is required.";
      }
      if (!eventCity) {
        errors.eventCity = "Please select a city.";
      }
      if (!eventCategory) {
        errors.eventCategory = "Please select a category.";
      }
    }

    if (currentStep === 2) {
      if (!eventOverview.trim()) {
        errors.eventOverview = "Event Overview is required.";
      }
      if (!eventPic) {
        errors.eventPic = "Please upload a promotional file.";
      }
    }

    if (currentStep === 3) {
      if (!eventDDate) {
        errors.eventDDate = "Registration Deadline Date is required.";
      }
      if (!eventDTime) {
        errors.eventDTime = "Registration Deadline Time is required.";
      }
      if (!eventCapacity.trim() || isNaN(eventCapacity) || eventCapacity <= 0) {
        errors.eventCapacity = "Please enter a valid participant capacity.";
      }
    }
    if (currentStep === 5){
      if(!eventType){

      }
    }
    return errors;
  };
  const handleButtonClick = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
      return; 
    }
  
    setErrors({}); 
    setCurrentStep((step) => step + 1); 
  };
  const clearAll = () => {
    setSboId('null');
    setEventDescription('');
    setEventName('');
    setEventDate('');
    setLocationId('null');
    setCategoryId('null');
    setEventCapacity('');
    setEndsAt('');
    setEventImage('');
    setEventType('');
  };

  const handlePublishEvent = async (isDraft) => {
    const validateInputs = () => {
      const newErrors = {};
  
      if (!eventName.trim()) {
        newErrors.eventName = "Event name is required.";
      } else if (eventName.length < 3) {
        newErrors.eventName = "Event name must be at least 3 characters.";
      }
  
      if (!eventDate) {
        newErrors.eventDate = "Event date is required.";
      }
  
      if (!eventTime) {
        newErrors.eventTime = "Event start time is required.";
      }
      if (!end){
        newErrors.end = "Event end time is required!";
      }
      if (!eventLocation.trim()) {
        newErrors.eventLocation = "Event location is required.";
      }
  
      if (!eventCity) {
        newErrors.eventCity = "Please select a city.";
      }
  
      if (!eventOverview.trim()) {
        newErrors.eventOverview = "Event overview is required.";
      } else if (eventOverview.length < 10) {
        newErrors.eventOverview = "Event overview must be at least 10 characters.";
      }
  
      if (!eventPic) {
        newErrors.eventPic = "Please upload a file.";
      } else {
        const validFileTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validFileTypes.includes(eventPic.type)) {
          newErrors.eventPic = "Invalid file type. Only JPEG, PNG, and PDF are allowed.";
        }
        const maxFileSize = 2 * 1024 * 1024; // 2MB
        if (eventPic.size > maxFileSize) {
          newErrors.eventPic = "File size exceeds 2MB.";
        }
      }
  
      if (!eventCategory) {
        newErrors.eventCategory = "Please select a category.";
      }
  
      if (!eventDDate) {
        newErrors.eventDDate = "Please select a registration deadline date.";
      } else if (new Date(eventDDate) < new Date()) {
        newErrors.eventDDate = "Deadline date cannot be in the past.";
      }
  
      if (!eventDTime) {
        newErrors.eventDTime = "Please select a registration deadline time.";
      }
  
      if (!eventCapacity || isNaN(eventCapacity) || eventCapacity <= 0) {
        newErrors.eventCapacity = "Capacity must be a valid positive number.";
      }
      
      if (!eventType){
        newErrors.eventType = "Please choose the event type!";
      }
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
    const validationPassed = validateInputs();
    if (!validationPassed){
        alert("Please fill up the forms in the previous steps!");
        return;
    }; 

    const data = await convertUrl(eventPic);
    const locationData = {
      location_city: eventCity,
      location_name: eventLocation,
    };
    const completeDD = `${eventDDate} ${eventDTime}`
    const location_id = await createLocation(sboToken, locationData);
    const sample = await getCategoryId(eventCategory);
    const category_id = sample.data.category_id;
  
    if (isDraft) {

      const dataPayload = {
        sbo_id: sbo.sbo_id,
        event_description: eventOverview,
        event_name: eventName,
        event_date: eventDate,
        start_time: eventTime,
        end_time: end,
        location_id: location_id,
        category_id: category_id,
        capacity: eventCapacity,
        ends_at: completeDD,
        event_image: data.url,
        custom_field: fields ? fields : null,
        event_type: eventType
      };
      const result = await getEventByIdNameDate(sbo.sbo_id, eventName, completeDate);
      if(result.length > 0){
        console.log("The same event is already published!");
        return;
      }
      else{
        console.log(`Hello, ${result}`);
      }

      const da = {
        sbo_id: sbo.sbo_id,
        draft_name: draftName,
        event_data: dataPayload
      }
      try{
        await draftCreation(sboToken, da);
        toast.success("Draft Successfully Created!");
      }catch(e){
        console.log(e);
        toast.error("Draft Already Exists or An Event like this Draft Exist!");
      }
    } else {
      console.log("Hi");
      console.log(eventTime)
      console.log(end)
      const dataPayload = {
        sbo_id: sbo.sbo_id,
        event_description: eventOverview,
        event_name: eventName,
        event_date: eventDate,
        start_time: eventTime,
        end_time: end,
        location_id: location_id,
        category_id: category_id,
        capacity: eventCapacity,
        ends_at: completeDD,
        event_image: data.url,
        custom_fields: JSON.stringify(fields),
        event_type: eventType
      };
      try{
        await createEvent(sboToken, dataPayload);
        toast.success("Event Created Successfully!");
      }catch(e){
        toast.error("Invalid Event, or Event Already Exists!");
      }
    }
    clearAll();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory(); 
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); 

  const activeStep = {
    1: (
      <div className="sboce-step1-container">
        <div className="sboce-create-event-container">
          <div className="sboce-details">
            <h2 style={{ fontFamily: "Righteous", fontWeight: "normal" }}>Event Details</h2>
            <p>Please fill out the form below to set up your event.</p>

            {/* Event Name */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: "15px", marginBottom: "10px" }}>Event Name</p>
              <input
                type="text"
                placeholder="Enter Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{
                  width: "100vh",
                  paddingLeft: "10px",
                  padding: "7px",
                  border: errors.eventName ? "1px solid red" : "1px solid black",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              {errors.eventName && <p style={{ color: "red", fontSize: "12px" }}>{errors.eventName}</p>}
            </div>

            <div style={{ marginTop: 10, display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                <p style={{ fontSize: "15px", marginBottom: "10px" }}>Date</p>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  style={{
                    width: "40vh",
                    paddingLeft: "10px",
                    padding: "7px",
                    border: errors.eventDate ? "1px solid red" : "1px solid black",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
                {errors.eventDate && <p style={{ color: "red", fontSize: "12px" }}>{errors.eventDate}</p>}
              </div>
            </div>
            
            <div style={{ marginTop: 10, display: "flex" , gap:'1rem' }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "15px", marginBottom: "10px" }}>Start Time</p>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  style={{
                    width: "40vh",
                    paddingLeft: "10px",
                    padding: "7px",
                    border: errors.eventTime ? "1px solid red" : "1px solid black",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
                {errors.eventTime && <p style={{ color: "red", fontSize: "12px" }}>{errors.eventTime}</p>}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "15px", marginBottom: "10px" }}>End Time</p>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  style={{
                    width: "40vh",
                    paddingLeft: "10px",
                    padding: "7px",
                    border: errors.eventTime ? "1px solid red" : "1px solid black",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
                {errors.end && <p style={{ color: "red", fontSize: "12px" }}>{errors.end}</p>}
              </div>
            </div>
            {/* Location */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: "15px", marginBottom: "10px" }}>Location</p>
              <input
                type="text"
                placeholder="Enter Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                style={{
                  width: "60vh",
                  paddingLeft: "10px",
                  padding: "7px",
                  border: errors.eventLocation ? "1px solid red" : "1px solid black",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              {errors.eventLocation && <p style={{ color: "red", fontSize: "12px" }}>{errors.eventLocation}</p>}
            </div>

            {/* Select City */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: "15px", marginBottom: "10px" }}>Select City</p>
              <select
                value={eventCity}
                onChange={(e) => setEventCity(e.target.value)}
                style={{
                  width: "60vh",
                  padding: "7px",
                  border: errors.eventCity ? "1px solid red" : "1px solid black",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "white",
                }}
              >
                <option value="" disabled>Select City</option>
                <option value="Manila">Manila</option>
                <option value="Quezon City">Quezon City</option>
                <option value="Cebu City">Cebu City</option>
                <option value="Davao City">Davao City</option>
                <option value="General Santos City">General Santos City</option>
                <option value="Zamboanga City">Zamboanga City</option>

              </select>
              {errors.eventCity && <p style={{ color: "red", fontSize: "12px" }}>{errors.eventCity}</p>}
            </div>

            {/* Category */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: "15px", marginBottom: "10px" }}>Category</p>
              <select
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                style={{
                  width: "60vh",
                  padding: "7px",
                  border: errors.eventCategory ? "1px solid red" : "1px solid black",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "white",
                }}
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category_name}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
              {errors.eventCategory && <p style={{ color: "red", fontSize: "12px" }}>{errors.eventCategory}</p>}
            </div>

            {/* Next Step Button */}
            <div className="buttonContainer" style={{ marginTop: 20 }}>
              <button className="buttonStyle" onClick={handleButtonClick}>
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="sboce-step2-container">
        <div className="sboce-create-event-container">
          <div className="sboce-details">
            <h2 style={{ fontFamily: "Righteous", fontWeight: "normal" }}>Select Event Description</h2>
            <p>Please provide an overview and any promotional materials to help us promote your event effectively.</p>

            {/* Event Overview */}
            <div style={{ marginTop: "50px" }}>
              <h5>Event Overview</h5>
              <textarea
                placeholder="Enter Event Description or Overview"
                value={eventOverview}
                onChange={(e) => setEventOverview(e.target.value)}
                style={{
                  width: "100%",
                  height: "120px",
                  padding: "10px",
                  border: errors.eventOverview ? "1px solid red" : "1px solid black",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              ></textarea>
              {errors.eventOverview && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.eventOverview}</p>
              )}
            </div>

            {/* File Upload */}
            <div style={{ marginTop: "30px" }}>
              <h5>Upload File</h5>
              <input
                type="file"
                onChange={handleFileInput}
                style={{
                  padding: "10px",
                  width: "50%",
                  border: errors.eventPic ? "1px solid red" : "1px solid black",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              {eventPic ? <p>{`Selected File: ${eventPic.name}`}</p> : null}
              {errors.eventPic && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.eventPic}</p>
              )}
            </div>

            {/* Next Step Button */}
            <div className="buttonContainer" style={{ marginTop: "30px" }}>
              <button className="buttonStyle" onClick={handleButtonClick}>
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="sboce-step3-container">
      <div className="sboce-create-event-container">
        <div className="sboce-details">
          <h2 style={{ fontFamily: "Righteous", fontWeight: "normal" }}>
            Registration Details
          </h2>
          <p>
            Specify the registration deadline and participant capacity.
          </p>

          <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
            <p style={{ fontSize: "20px", marginTop: "50px", marginBottom: "0px" }}>
              Registration Deadline
            </p>
            <p style={{ fontSize: "15px", marginTop: "50px", marginBottom: "5px" }}>
              Date
            </p>
            <input
              type="date"
              placeholder="mm/dd/yyyy"
              value={eventDDate}
              onChange={(e) => setEventDDate(e.target.value)}
              style={{
                width: "40vh",
                paddingLeft: "10px",
                padding: "7px",
                border: errors.eventDDate ? "1px solid red" : "1px solid black",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            {errors.eventDDate && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.eventDDate}</p>
            )}
            <p style={{ fontSize: "15px", marginBottom: "10px" }}>Time</p>
            <input
              type="time"
              placeholder="HH AM/PM - HH AM/PM"
              value={eventDTime}
              onChange={(e) => setEventDTime(e.target.value)}
              style={{
                width: "40vh",
                paddingLeft: "10px",
                padding: "7px",
                border: errors.eventDTime ? "1px solid red" : "1px solid black",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            {errors.eventDTime && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.eventDTime}</p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
            <p style={{ fontSize: "15px", marginTop: "30px", marginBottom: "5px" }}>
              Capacity
            </p>
            <input
              type="text"
              placeholder="Max number of participants"
              onChange={(e) => setEventCapacity(e.target.value)}
              value={eventCapacity}
              style={{
                width: "40vh",
                paddingLeft: "10px",
                padding: "7px",
                border: errors.eventCapacity ? "1px solid red" : "1px solid black",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            {errors.eventCapacity && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.eventCapacity}</p>
            )}
          </div>

          <div className="buttonContainer">
            <button className="buttonStyle" onClick={handleButtonClick}>
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
    ),
    4: (
      <div className="sboce-step4-container">
        <div className="sboce-create-event-container">
          <div className="sboce-details">
            <h2 style={{ fontFamily:"Righteous", fontWeight: 'normal' }}>Registration Questions (Optional)</h2>
            <p>Add any specific questions you’d like to ask participants during registration. This helps tailor the experience to their needs.</p>
            <div className='inp-cont'> 
                {fields.map((inp, index) => (
                    renderInput(inp, index)
                ))}   
            </div>
            <div className="buttonContainer">
              <button className="buttonStyle addBtn" onClick={toggleModal}>Add Field</button>
              <button className="buttonStyle" onClick={handleButtonClick}>Next Step</button>
            </div>

            {isModalOpen && (
              <div className="modalOverlay">
                <div className="modalContent">
                  <h3>Create Custom Field</h3>

                  <div className="inputFieldContainer">
                    <label>Field Type:</label>
                    <select
                      value={fieldType}
                      onChange={(e) => setFieldType(e.target.value)}
                    >
                      <option value="text">Description</option>
                      <option value="radio">Yes or No</option>
                      <option value="checkbox">Multiple Choice</option>
                    </select>
                  </div>

                  {(fieldType === "text") ? (
                      <div className="inputFieldContainer">
                        <div className="inputFieldContainer">
                          <label>Field Label:</label>
                          <input
                            type="text"
                            value={fieldLabel}
                            onChange={(e) => setFieldLabel(e.target.value)}
                          />
                        </div>
                        <label>PlaceHolder</label>
                        <input
                          type={fieldType}
                          value={placeholder}
                          onChange={(e) => setPlaceholder(e.target.value)}
                        />
                         <div className="previewFieldContainer">
                          <label className="previewLabel">
                            {fieldLabel || "Field Label"}
                          </label>
                          <input
                            className="previewInput"
                            type={fieldType || "text"}
                            placeholder={placeholder}
                            disabled
                          />
                        </div>
                      </div>
                      
                  ):(fieldType === 'radio')? (
                    <div className="inputFieldContainer">
                        <div className="inputFieldContainer">
                          <label>Field Label:</label>
                          <input
                            type="text"
                            value={fieldLabel}
                            onChange={(e) => setFieldLabel(e.target.value)}
                          />
                        </div>
                         <div className="previewFieldContainer">
                          <label className="previewLabel">
                            {fieldLabel || "Field Label"}
                          </label>
                          <div className="radio-cont">
                            <label htmlFor="yes" className="radio-label">
                              Yes
                              <input type='radio' className="radinp" id="yes" name='rad'  />
                            </label>
                            <label htmlFor="no" className="radio-label">
                            No
                              <input type='radio' className="radinp" id="no" name='rad' />
                            </label>
                          </div>
                        </div>
                      </div>
                  ):(fieldType === 'checkbox')? (
                    <div className="inputFieldContainer">
                        <div className="inputFieldContainer">
                          <label>Field Label:</label>
                          <input
                            type="text"
                            value={fieldLabel}
                            onChange={(e) => setFieldLabel(e.target.value)}
                          />
                          <button className='obtn' onClick={handleOpen}>Add Option</button>

                        </div>
                         <div className="previewFieldContainer">
                          <label className="previewLabel">
                            {fieldLabel || "Field Label"}
                          </label>
                          <div className='check-cont'>
                          {boxes.map((box) =>{
                            return(
                            <div className='check'>
                              <input type="checkbox" name="checks" value={box.value} className='c'/>
                              <label htmlFor="food1">{box.value}</label>
                            </div>
                            )
                          })}
      
                          {openAdd&&
                            <div> 
                                  <div className='check'>
                                    <input type="checkbox" name="checks" className='c'/>
                                    <input type="text" name="" id="" onChange={(e) => setBoxName(e.target.value)}/>
                                  </div>
                              <div className='cbcont'>
                                <button onClick={handleSaveBox}>Save!</button>
                                <button onClick={() => setOpenAdd(!openAdd)}>Cancel</button>
                              </div>
                            </div>
                          }
                          </div>
                        </div>
                      </div>
                  ): null
                  }

                  <div className="modalActions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleModal}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    5: (
      <div className="sboce-step5-container">
        <div className="sboce-create-event-container">
          <div className="sboce-details">
            <section className='sbe-type'>
              <p>Event Type</p>
              <select
                name="event-type"
                id="event-type"
                className="event-select"
                value={eventType} 
                onChange={handleEventTypeChange}
              >
                <option value="">-- Select Event Type --</option>
                <option value="sbo-events">SBO EVENTS</option>
                <option value="all-events">ALL EVENTS</option>
              </select>
              {errors.eventType && <p style={{ color: "red", fontSize: '12px' }}>{errors.eventType}</p>}

            </section>
            <section className="sboce-final-steps">
              <label style={{ padding: "10px", fontFamily: "Righteous", fontWeight: "normal" }}>
                <h2>Final Steps</h2>
                <p>Once you're satisfied, choose to save, publish, or preview the event.</p>
              </label>

              <label className="sboce-spd-container">
                <card className="card card1">
                  <button className="sboce-spd-btn" onClick={() => handlePublishEvent(false)}>PUBLISH</button>
                </card>
                <card className="card card2">
                  <button className="sboce-spd-btn" onClick={() => handleDraftModal()}>DRAFT</button>  
                </card>
              </label>
              {draftModal && (
                <div className="modalOverlay">
                  <div className="modalContent">
                    <h2>Enter Draft Name</h2>

                    <input
                      type="text"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="Draft Name"
                    />

                    <div className="modalActions">
                      <button className="cancel-btn" onClick={() => setDraftModal(false)}>
                        Cancel
                      </button>
                      <button className="save-btn" onClick={() => handlePublishEvent(true)}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <label className="sboce-fs-button">
                <button className="buttonStyle">CHECK EVENTS</button>
              </label>
            </section>
            <p style={{ display: "flex", justifyContent: "center"}}>Contact Information | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial state (hidden, shifted down)
      animate={{ opacity: 1, y: 0 }} // Final state (visible, original position)
      exit={{ opacity: 0, y: -50 }} // Exit state (hidden, shifted up)
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
    >
    <ToastContainer />
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="sbo-create-events-container">
        <div className="sboce-info-container">
          <h2 style={{ color: "#6C23B5", marginBottom: 5, fontFamily: "Righteous", fontWeight: "normal" }}>Create Your Event!</h2>
          <p>To create your event, please follow the</p>
          <p>step-by-step form below. Be sure to</p>
          <p>provide all the necessary details so</p>
          <p>participants know what to expect:</p>

          <div className="sboce-steps-container">
            <div
              className={`step step-1 ${currentStep === 1 ? "highlight" : ""}`}
              onClick={() => setCurrentStep(1)} // ara sa na para check2 sa steps
              
            >
              <p style={ pStyle }>Step 1</p>
              <h5>Event Details</h5>
              <p style={ pStyle }>Enter the essential</p>
              <p style={ pStyle }>information about your event.</p>
            </div>
            <div
              className={`step step-2 ${currentStep === 2 ? "highlight" : ""}`}
              onClick={() => setCurrentStep(2)}// ara sa na para check2 sa steps
            >
              <p style={ pStyle }>Step 2</p>
              <h5>Event Description</h5>
              <p style={ pStyle }>Provide an overview and upload any</p>
              <p style={ pStyle }> promotional materials (pubmats)</p>
              <p style={ pStyle }> to help spread the word!</p>
            </div>
            <div
              className={`step step-3 ${currentStep === 3 ? "highlight" : ""}`}
              onClick={() => setCurrentStep(3)}// ara sa na para check2 sa steps
            >
              <p style={ pStyle }>Step 3</p>
              <h5>Registration Details</h5>
              <p style={ pStyle }>Set a registration deadline, capacity </p>
              <p style={ pStyle }>limits, and decide if you want to enable</p>
              <p style={ pStyle }>a waitlist for interested participants</p>
            </div>
            <div
              className={`step step-4 ${currentStep === 4 ? "highlight" : ""}`}
              onClick={() => setCurrentStep(4)}// ara sa na para check2 sa steps
            >
              <p style={ pStyle }>Step 4</p>
              <h5>Custom Fields</h5>
              <p style={ pStyle }>Add any additional questions to tailor the</p>
              <p style={ pStyle }>registration process to your needs.</p>
              <p style={ pStyle }></p>
            </div>
            <div
              className={`step step-5 ${currentStep === 5 ? "highlight" : ""}`}
              onClick={() => setCurrentStep(5)}// ara sa na para check2 sa steps
            >
              <p style={ pStyle }>Step 5</p>
              <h5>Preview & Confirm</h5>
              <p style={ pStyle }>Review your entries to ensure everything</p>
              <p style={ pStyle }>looks good before making it live.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Display the active step content */}
      <div className="sboce-step-content-container">
        {activeStep[currentStep]}
      </div>
    </div>
    </motion.div>
  );
};

export default SBOCreateEvent;
