import axios from "axios";

const getSboById = async(authToken,sbo_id) =>{
    const data = await axios.get(`http://localhost:3000/sbo/${sbo_id}`,{
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return data;
}

const getAllSbo = async() => {
    const data = await axios.get('http://localhost:3000/sbo/names');
    return data;
}

const getSbo = {
    getSboById,
    getAllSbo
};

export default getSbo;