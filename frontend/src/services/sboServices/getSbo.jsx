import axios from "axios";

const getSboById = async(authToken,sbo_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/sbo/${sbo_id}`,{
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return data;
    }catch(e){
        console.log(e);
    }
}

const getAllSbo = async() => {
    try{
        const data = await axios.get('http://localhost:3000/sbo/names');
        return data;
    }catch(e){
        console.log(e);
    }
}

const getSboId = async(authToken,sbo_name) =>{
    try{
        console.log(sbo_name);
        const data = await axios.get(`http://localhost:3000/sbo/names/${sbo_name}`,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return(data.data[0]);
    }
    catch(e){
        console.log(e);
    }
}

const getUnverified = async(authToken) =>{
    try{
        const data = await axios.get('http://localhost:3000/sbo/unverified', {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        })
        return data.data;
    }catch(e){
        console.log(e);
        throw e;
    }
};
const getSbo = {
    getSboById,
    getAllSbo,
    getSboId,
    getUnverified
};

export default getSbo;