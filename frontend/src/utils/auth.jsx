import { jwtDecode } from 'jwt-decode';
const decodeToken = (token) =>{
    return token? jwtDecode(token): false;
}

export {decodeToken};