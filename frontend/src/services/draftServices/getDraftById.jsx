import axios from "axios";

const getDraftById = async(authToken, sbo_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/draft/${sbo_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log(data.data);
        return(data.data);
    }catch(e){
        console.log(e);
    }
}

export {getDraftById};