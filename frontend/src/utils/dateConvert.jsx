import { format } from "date-fns";

const convertToWritten = (date) =>{

    return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    });

};

const extractTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
  
    if (isNaN(date)) {
      throw new Error("Invalid timestamp provided.");
    }
  
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, 
    });
  };

  function convertTimestampToReadableFormat(timestamp) {
    const date = new Date(timestamp);
  
    const month = date.toLocaleString('default', { month: 'short' }); 
    const day = date.getDate(); // Gets day of the month
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
  
    return `${month} ${day} ${hours}:${minutes}`;
  }
  function formatCurrentTime() {
    const dateNow = new Date();
    return dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
export {convertToWritten, extractTimeFromTimestamp, convertTimestampToReadableFormat, formatCurrentTime}