import axios from "axios";

const convertUrl = async(image) =>{
    const formData = new FormData();
    formData.append('image', image);

    const data = await axios.post('http://localhost:3000/convert',formData);
    return data.data;
}

export default convertUrl