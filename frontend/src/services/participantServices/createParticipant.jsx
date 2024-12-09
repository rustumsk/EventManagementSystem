import axios from "axios";

const createParticipant = async(authToken, data) =>{
    try{
        const result = await axios.post('http://localhost:3000/participant', data, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log("Participant inserted!");
        return result.data;
    }catch(e){
        console.log(e);
    }
}

export {createParticipant}