import axios from "axios";

const getSboById = async(authToken,sbo_id) =>{
    const data = await axios.get(`http://localhost:3000/sbo/${sbo_id}`,{
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return data;
}

const getSbo = {
    getSboById
};

export default getSbo;