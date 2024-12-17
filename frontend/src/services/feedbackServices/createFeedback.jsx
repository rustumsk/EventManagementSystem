import axios from "axios";

const createFeedback = async(authToken, data) =>{
    try{
        console.log(data);
        await axios.post('http://localhost:3000/feedback', data, {
            headers:{
                'Authorization': `Bearer ${authToken}`,
            }
        })
        console.log("Feedback Created!");
    }catch(e){  
        throw e;
    }
}

export {createFeedback};