import axios from "axios";

const getEventById = async(authToken, sbo_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/events/sbo/${sbo_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return (data.data);
    }catch(e){
        console.log(e);
    }
}

const getEventByIdNameDate = async (sbo_id, event_name, event_date) => {
    try {
      const result = await axios.get('http://localhost:3000/events/sbo/event', {
        params: { sbo_id, event_name, event_date }
      });
      console.log('Response:', result);
      return result.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

const getEventByStudentId = async(authToken, student_id) =>{
  try{
    const result = await axios.get(`http://localhost:3000/events/participate/${student_id}`,{
      headers:{
        'Authorization': `Bearer ${authToken}`,
      }
    })
    return result.data;
  }catch(e){
    console.log(e);
  }
}

const getTopEvent = async() =>{
  try{
    const result = await axios.get(`http://localhost:3000/events/top`);
    return result.data;
  }catch(e){
    throw e;
  }
}
export {getEventById, getEventByIdNameDate, getEventByStudentId, getTopEvent};