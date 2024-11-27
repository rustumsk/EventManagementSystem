// import React, { useState } from "react";
// import "../styles/sbocreateevent.scss";

// const SBOCreateEvent = () => {
//   const step = 1;
//   const [currentStep, setCurrentStep] = useState(step);

//   const pStyle = {
//     fontSize: "13px",
//   };

//   const handleButtonClick =() => {
//     setCurrentStep(step => step + 1);
//   };

//   const activeStep = {
//     1: (
//       <div className="sboce-step1-container">
//         <div className="sboce-event-details-container">
//           <div className="sboce-event-details">
//             <h2 style={{ fontFamily:"Righteous", fontWeight: 'normal' }}>Event Details</h2>
//             <p>Please fill out the form below to set up your event.</p>
            
            
//             <div style={{ marginTop:20}}>
//               <p style={{ fontSize: "15px", marginBottom: "10px" }}>Event Name</p>
//               <input
//                 type="text"
//                 placeholder="Enter Event Name"
//                 style={{
//                   width: "100vh",
//                   paddingLeft: "10px",
//                   padding: "7px",
//                   border: "1px solid black",
//                   borderRadius: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 }}
//               />
//             </div>

//             <div style={{ marginTop:10 , display: "flex"}}>
//               <div style={{ display: "flex", flexDirection: "column", marginRight: "20px"}}>
//                 <p style={{ fontSize: "15px", marginBottom: "10px"}}>Date</p>
//                 <input
//                   type="text"
//                   placeholder="mm/dd/yyyy"
//                   style={{
//                     width: "40vh",
//                     paddingLeft: "10px",
//                     padding: "7px",
//                     border: "1px solid black",
//                     borderRadius: "5px",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   }}
//                 />
//               </div>
//               <div style={{ display: "flex", flexDirection: "column"}}>
//                 <p style={{ fontSize: "15px", marginBottom: "10px" }}>Time</p>
//                 <input
//                   type="text"
//                   placeholder="HH AM/PM - HH AM/PM"
//                   style={{
//                     width: "40vh",
//                     paddingLeft: "10px",
//                     padding: "7px",
//                     border: "1px solid black",
//                     borderRadius: "5px",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   }}
//                 />
//               </div >
//             </div>

//             <div style={{ marginTop:30}}>
//               <p style={{ fontSize: "15px", marginBottom: "10px" }}>Location</p>
//               <input
//                 type="text"
//                 placeholder="Enter Location"
//                 style={{
//                   width: "60vh",
//                   paddingLeft: "10px",
//                   padding: "7px",
//                   border: "1px solid black",
//                   borderRadius: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 }}
//               />
//             </div>

//             <div style={{ marginTop:30}}>
//               <p style={{ fontSize: "15px", marginBottom: "10px" }}>Category</p>
//               <select
//                 style={{
//                   width: "60vh",  
//                   padding: "7px",
//                   border: "1px solid black",
//                   borderRadius: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   backgroundColor: "white",
//                 }}
//               >
//                 <option value="" disabled selected>Select Option</option>
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//                 <option value="option4">Option 4</option>
//                 <option value="option5">Option 5</option>
//               </select>
//             </div>

//             <div className="buttonContainer">
//               <button className="buttonStyle" onClick={handleButtonClick}>Next Step</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//     2: (
//       <div className="sboce-step2-container">
//         <div className="sboce-event-details-container">
//           <div className="sboce-event-details">
//             <h2 style={{ fontFamily:"Righteous", fontWeight: 'normal' }}>Select Event Description</h2>
//             <p>Please provide an overview and any promotional materials to help us promote your event effectively.</p>

//             <div style={{marginTop: "50px"}}>
//               <h5>Event Overview</h5>
//               <input
//                 type="text"
//                 placeholder="enter description here"
//                 style={{
//                   padding: "80px",
//                   paddingRight: "70vh",
//                   border: "1px solid black",
//                   borderRadius: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 }}
//               />
//             </div>

//             <div style={{marginTop: "30px"}}>
//               <h5>Upload File</h5>
//               <input
//                 type="file"
//                 placeholder="Upload Files Here"
//                 style={{
//                   padding: "10px",
//                   width: "50%",
//                   border: "1px solid black",
//                   borderRadius: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 }}
//               />
//             </div>

//             <div style={{marginTop: "30px"}}>
//               <h5>Upload File</h5>
//               <input
//                 type="file"
//                 placeholder="Upload Files Here"
//                 style={{
//                   padding: "10px",
//                   width: "50%",
//                   border: "1px solid black",
//                   borderRadius: "5px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 }}
//               />
//             </div>

//             <div className="buttonContainer">
//               <button className="buttonStyle" onClick={handleButtonClick}>Next Step</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//     3: (
//       <div className="sboce-step3-container">
//         <div className="sboce-event-details-container">
//           <div className="sboce-event-details">
//             <h2 style={{ fontFamily:"Righteous", fontWeight: 'normal' }}>Registration Details</h2>
//             <p>Specify the registration deadline, participant capacity, and whether you’d like to include a waitlist for those interested!</p>

//             <div style={{ display: "flex", flexDirection: "column", marginRight: "20px"}}>
//                 <p style={{ fontSize: "15px", marginTop: "50px", marginBottom: "5px"}}>Registration Deadline</p>
//                 <input
//                   type="text"
//                   placeholder="mm/dd/yyyy"
//                   style={{
//                     width: "40vh",
//                     paddingLeft: "10px",
//                     padding: "7px",
//                     border: "1px solid black",
//                     borderRadius: "5px",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   }}
//                 />
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", marginRight: "20px"}}>
//                 <p style={{ fontSize: "15px", marginTop: "30px", marginBottom: "5px"}}>Capacity</p>
//                 <input
//                   type="text"
//                   placeholder="Max number of participants"
//                   style={{
//                     width: "40vh",
//                     paddingLeft: "10px",
//                     padding: "7px",
//                     border: "1px solid black",
//                     borderRadius: "5px",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                   }}
//                 />
//               </div>

//             <div className="buttonContainer">
//               <button className="buttonStyle" onClick={handleButtonClick}>Next Step</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//     4: (
//       <div className="sboce-step4-container">
//         <div className="sboce-event-details-container">
//           <div className="sboce-event-details">
//             <h2 style={{ fontFamily:"Righteous", fontWeight: 'normal' }}>Custom Fields</h2>
//             <p>Add any specific questions you’d like to ask participants during registration. This helps tailor the experience to their needs.</p>
//             <div className="buttonContainer">
//               <button className="buttonStyle" onClick={handleButtonClick}>Next Step</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//     5: (
//       <div className="sboce-step5-container">
//         <div className="sboce-event-details-container">
//           <div className="sboce-event-details">
//             <h2 style={{ fontFamily:"Righteous", fontWeight: 'normal' }}>Preview & Confirm</h2>
//             <p>Review and confirm the details for your event.</p>
//             <div className="buttonContainer">
//               <button className="buttonStyle" onClick={handleButtonClick}>Next Step</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div className="sbo-create-events-container">
//         <div className="sboce-info-container">
//           <h2
//             style={{
//               color: "#6C23B5",
//               marginBottom: 5,
//               fontFamily: "Righteous",
//               fontWeight: "normal",
//             }}
//           >
//             Create Your Event!
//           </h2>
//           <p>To create your event, please follow the</p>
//           <p>step-by-step form below. Be sure to</p>
//           <p>provide all the necessary details so</p>
//           <p>participants know what to expect:</p>

//           <div className="sboce-steps-container">
//             <div
//               className={`step step-1 ${currentStep === 1 ? "highlight" : ""}`}
//               onClick={() => setCurrentStep(1)} // ara sa na para check2 sa steps
              
//             >
//               <p style={ pStyle }>Step 1</p>
//               <h5>Event Details</h5>
//               <p style={ pStyle }>Enter the essential</p>
//               <p style={ pStyle }>information about your event.</p>
//             </div>
//             <div
//               className={`step step-2 ${currentStep === 2 ? "highlight" : ""}`}
//               onClick={() => setCurrentStep(2)}// ara sa na para check2 sa steps
//             >
//               <p style={ pStyle }>Step 2</p>
//               <h5>Event Description</h5>
//               <p style={ pStyle }>Provide an overview and upload any</p>
//               <p style={ pStyle }> promotional materials (pubmats)</p>
//               <p style={ pStyle }> to help spread the word!</p>
//             </div>
//             <div
//               className={`step step-3 ${currentStep === 3 ? "highlight" : ""}`}
//               onClick={() => setCurrentStep(3)}// ara sa na para check2 sa steps
//             >
//               <p style={ pStyle }>Step 3</p>
//               <h5>Registration Details</h5>
//               <p style={ pStyle }>Set a registration deadline, capacity </p>
//               <p style={ pStyle }>limits, and decide if you want to enable</p>
//               <p style={ pStyle }>a waitlist for interested participants</p>
//             </div>
//             <div
//               className={`step step-4 ${currentStep === 4 ? "highlight" : ""}`}
//               onClick={() => setCurrentStep(4)}// ara sa na para check2 sa steps
//             >
//               <p style={ pStyle }>Step 4</p>
//               <h5>Custom Fields</h5>
//               <p style={ pStyle }>Add any additional questions to tailor the</p>
//               <p style={ pStyle }>registration process to your needs.</p>
//               <p style={ pStyle }></p>
//             </div>
//             <div
//               className={`step step-5 ${currentStep === 5 ? "highlight" : ""}`}
//               onClick={() => setCurrentStep(5)}// ara sa na para check2 sa steps
//             >
//               <p style={ pStyle }>Step 5</p>
//               <h5>Preview & Confirm</h5>
//               <p style={ pStyle }>Review your entries to ensure everything</p>
//               <p style={ pStyle }>looks good before making it live.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Display the active step content */}
//       <div className="sboce-step-content-container">
//         {activeStep[currentStep]}
//       </div>
//     </div>
//   );
// };

// export default SBOCreateEvent;