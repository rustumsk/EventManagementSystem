import axios from "axios";

const updateSboStatus = async(authToken,sbo_id) =>{
    try{
        const result = await axios.patch(`http://localhost:3000/sbo/status`,{sbo_id:sbo_id}, {
            headers:{
                "Authorization": `Bearer ${authToken}`
            }
        })
        return result;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {updateSboStatus};