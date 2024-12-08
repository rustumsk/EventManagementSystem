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

export {getEventById};