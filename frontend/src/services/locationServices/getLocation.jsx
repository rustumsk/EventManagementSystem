import axios from "axios";

const getLocationById = async(authToken, location_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/location/${location_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return data.data[0];
    }catch(e){  
        console.log(e);
    }
}

const getLocationNameById = async(location_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/location/name/${location_id}`
        );
        return data.data;
    }catch(e){  
        console.log(e);
    }
}
export {getLocationById, getLocationNameById};