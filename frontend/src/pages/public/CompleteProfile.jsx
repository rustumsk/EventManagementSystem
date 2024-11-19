import '../../styles/complete-profile.scss';
import { jwtDecode } from 'jwt-decode';  // Use named import
const urlParams = new URLSearchParams(window.location.search);
import { useNavigate } from "react-router-dom";

const token = urlParams.get('token');
let google_id = "";
let email = "";

if(token){
    const decoded = jwtDecode(token);
    google_id = decoded.google_id;
    email = decoded.email;
}

export default function CompleteProfile(){
    const navigate = useNavigate();
    const submitCompleteProfile = () =>{
        navigate(`/signup/email-verification?token${token}`);
    }

    return(
        <div className="cp-container">
            <form action="" method="POST">
                <header className="cp-f-header">
                    Complete Registration
                </header>
                <div>{google_id}</div>
                <div>{email}</div>
                <label htmlFor="cp-fn">Full Name</label>
                <input type="text" id="cp-fn" placeholder="John Doe"/>

                <label htmlFor="cp-in">Id Number</label>
                <input type="text" id="cp-in" placeholder="John Doe"/>
                
                <label htmlFor="cp-pw">Password</label>
                <input type="password" id="cp-pw" placeholder="John Doe"/>

                <label htmlFor="cp-cpw">Confirm Password</label>
                <input type="password" id="cp-cpw" placeholder="John Doe"/>

                <button onClick={submitCompleteProfile}>Submit</button>
            </form>
        </div>
    )
}