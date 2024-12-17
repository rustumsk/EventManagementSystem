import axios from "axios";

const getCategoryName = async(category_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/category/name/${category_id}`);
        return data;
    }catch(e){
        throw e;
    }
}

export {getCategoryName}