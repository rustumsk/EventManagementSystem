import axios from "axios";

const createEvent = async(authtoken, data) =>{
    const createE = await axios.post('http://localhost:3000/events', data,{
        headers:{
            'Authorization': `Bearer ${authtoken}`
        }
    })
    console.log(createE.data);
}

export default createEvent;