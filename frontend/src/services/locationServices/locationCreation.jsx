import axios from "axios";

const createLocation = async(authToken, data) =>{
    try{
        const location_id = await axios.post('http://localhost:3000/location', data,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        })

        return location_id.data.location_id;
    }catch(e){
        console.log(e);
    }
}

export default createLocation