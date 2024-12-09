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
export {convertToWritten, extractTimeFromTimestamp}