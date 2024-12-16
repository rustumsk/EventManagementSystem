import axios from "axios";

const deleteSboById = async(authToken, sbo_id) =>{
    try{
        const result = await axios.delete(`http://localhost:3000/sbo/${sbo_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return result.data;
    }catch(e){
        console.log(e);
        throw e
    }
};

export {deleteSboById};

