import { jwtDecode } from 'jwt-decode';
const checkStudentAuthorized = (token) =>{
    return token? jwtDecode(token): false;
}

export {checkStudentAuthorized};