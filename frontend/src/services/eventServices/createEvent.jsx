import axios from "axios";

const createEvent = async(authtoken, data) =>{
    try{
        const createE = await axios.post('http://localhost:3000/events', data,{
            headers:{
                'Authorization': `Bearer ${authtoken}`
            }
        })
        console.log(createE.data);
    }catch(e){  
        console.log(e);
        throw e;
    }
}

export default createEvent;