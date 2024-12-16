import axios from "axios";

const deleteParticipantById = async(authToken,participant_id) =>{
    try{
        const resullt = await axios.delete(`http://localhost:3000/participant/${participant_id}`,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        })
        return resullt;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {deleteParticipantById};