import axios from "axios";

const updateParticipantStatus = async(authToken, participant_id, attendance_status, checked_in) =>{
    const data = {
        participant_id: participant_id,
        attendance_status: attendance_status,
        checked_in: checked_in
    }
    try{
        const result = await axios.patch('http://localhost:3000/participant', data, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        })
        return result;
    }catch(e){
        console.log(e);
    }
}

export {updateParticipantStatus};