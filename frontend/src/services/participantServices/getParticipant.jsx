import axios from "axios";

const getParticipantES = async( event_id, student_id) =>{
    try{
        const data = await axios.get('http://localhost:3000/participant/es', {
            params: {event_id: event_id, student_id: student_id}
        })
        return data.data[0].participant_id;
    }catch(e){
        throw e;
    }
}

const getAllParticipant = async(sbo_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/participant/all/${sbo_id}`)
        return data.data;
    }catch(e){
        throw e;
    }
}

const getAverage = async(sbo_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/participant/ave/${sbo_id}`)
        return data.data;
    }catch(e){
        throw e;
    }
}
const getAverage1 = async(sbo_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/participant/ave1/${sbo_id}`)
        return data.data;
    }catch(e){
        throw e;    
    }
}
const getChecked = async(event_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/participant/c/${event_id}`);
        return(data.data);
    }catch(e){
        console.log(e)
        throw e
    }
}
const getuChecked = async(event_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/participant/u/${event_id}`);
        return(data.data);
    }catch(e){
        console.log(e)
        throw e
    }
}

const getAllPart = async(event_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/participant/all/p/${event_id}`);
        return(data.data);
    }catch(e){
        console.log(e)
        throw e
    }
}
export {getParticipantES, getAllParticipant,getAverage, getAverage1,getChecked, getuChecked, getAllPart}