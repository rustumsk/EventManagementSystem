import axios from "axios";

const genToken = async (id_number, email, fullname, password, google_id) => {
    const response = await axios.post('http://localhost:3000/jwt', { id_number, email, fullname, password, google_id });
    return response.data.token;
}

export {genToken};