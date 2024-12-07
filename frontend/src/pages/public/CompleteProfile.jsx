import '../../styles/complete-profile.scss';
import { jwtDecode } from 'jwt-decode'; // Use named import
const urlParams = new URLSearchParams(window.location.search);
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { genToken } from '../../utils/jwt';
import { createGoogleStudent } from '../../services/studentServices/studentCreation';
import getSbo from '../../services/sboServices/getSbo';

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
    const [sbos, setSbos] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: "",
        idNumber: "",
        password: "",
        confirmPassword: "",
        sbo: "", // Added SBO field
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
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
        if (!formData.sbo) {
            newErrors.sbo = "Please select an SBO.";
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
        try {
            const dat = await createGoogleStudent(
                formData.idNumber,
                email,
                formData.fullName,
                formData.password,
                google_id,
                formData.sbo
            );
            const token = await genToken(
                formData.idNumber,
                email,
                formData.fullName,
                formData.password,
                google_id
            );

            navigate(`/studentlogin`);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const getAll = async () => {
            const data = await getSbo.getAllSbo();
            setSbos(data.data.rows);
        };
        getAll();
    }, []);

    return (
        <div className="cp-container">
            <form onSubmit={submitCompleteProfile} method="POST">
                <header className="cp-f-header">Complete Registration</header>
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
                {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                )}

                <label htmlFor="sbo">Select SBO</label>
                <select
                    id="sbo"
                    value={formData.sbo}
                    onChange={handleInputChange}
                >
                    <option value="">-- Select an SBO --</option>
                    {sbos.map((sbo) => (
                        <option key={sbo.sbo_name} value={sbo.sbo_name}>
                            {sbo.sbo_name}
                        </option>
                    ))}
                </select>
                {errors.sbo && <span className="error">{errors.sbo}</span>}
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}