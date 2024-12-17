import axios from "axios";

const getFeedbackByEventId = async(authToken, event_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/feedback/${event_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}.`
            }
        });
        return(data.data);
    }catch(e){
        throw e;
    }
}

const getAverageFeedback = async (sbo_id) => {
    try {
        const data = await axios.get(`http://localhost:3000/feedback/ave/${sbo_id}`);
        const ratings = data.data.map(event => Math.round(event.average_rating));
        const average = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;  
        return average;
    } catch (e) {
        throw e;
    }
}

const getAverageFeedbackByEventId = async(event_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/feedback/eve/${event_id}`);
        return(Math.round(data.data[0].avg));
    }catch(e){
        console.log(e);
        throw e;
    }
}
export {getFeedbackByEventId, getAverageFeedback, getAverageFeedbackByEventId};