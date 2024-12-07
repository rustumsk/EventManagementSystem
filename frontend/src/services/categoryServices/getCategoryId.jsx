import axios from "axios";

const getCategoryId = async(category_name) =>{
    try{
        const data = await axios.get(`http://localhost:3000/category/${category_name}`);
        return data.data;
    }catch(e){  
        console.log(e);
    }
}

export default getCategoryId;