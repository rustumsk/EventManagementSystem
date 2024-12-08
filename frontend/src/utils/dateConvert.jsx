import { format } from "date-fns";

const convertToWritten = (date) =>{

    return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    });

};

export {convertToWritten}