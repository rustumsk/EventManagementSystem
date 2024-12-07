import axios from "axios";

const getCategory = async () => {
    const response = await axios.get(`http://localhost:3000/category`);
    return response.data;
};

export default getCategory;