import '../../styles/complete-profile.scss';
import { jwtDecode } from 'jwt-decode'; // Use named import
const urlParams = new URLSearchParams(window.location.search);
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { genToken } from '../../utils/jwt';
import { createGoogleStudent } from '../../services/authServices/studentCreation';

const aInfo = urlParams.get('aInfo');
let google_id = "";
let email = "";

if (aInfo) {
    const decoded = jwtDecode(aInfo);
    google_id = decoded.google_id;
    email = decoded.email;
}

export default function CompleteProfile() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: "",
        idNumber: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        // Remove error message for the field being edited
        setErrors((prev) => ({
            ...prev,
            [id]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
        if (!formData.idNumber.trim()) {
            newErrors.idNumber = "ID number is required.";
        } else if (formData.idNumber.length !== 8) {
            newErrors.idNumber = "ID number must be exactly 8 characters.";
        }
        if (!formData.password.trim()) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const submitCompleteProfile = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const dat = await createGoogleStudent(formData.idNumber, email, formData.fullName, formData.password, google_id);
        const token = await genToken(formData.idNumber, email, formData.fullName, formData.password, google_id);
        navigate(`/signup/email-verification?info=${token}`);
    };

    return (
        <div className="cp-container">
            <form onSubmit={submitCompleteProfile} method="POST">
                <header className="cp-f-header">
                    Complete Registration
                </header>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                />
                {errors.fullName && <span className="error">{errors.fullName}</span>}

                <label htmlFor="idNumber">ID Number</label>
                <input
                    type="text"
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    placeholder="12345678"
                />
                {errors.idNumber && <span className="error">{errors.idNumber}</span>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="********"
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="********"
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
