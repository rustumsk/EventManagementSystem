import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { adminLogin } from '../../services/authServices/adminLogin';

export default function Admin() {
    const [formData, setFormData] = useState({
        adminName: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.adminName.length > 0){
            toast.error("Please Enter Admin Name!");
            return;
        }if (!formData.password.length > 0){
            toast.error("Please Enter Admin Password!");
            return;
        }

        try{
            await adminLogin(formData.adminName, formData.password);
            toast.success("Successfully logged in!");
            window.location.href = 'http://localhost:5173/adminapprove';
        }catch(e){
            console.log(e);
            toast.error("Invalid Credentials!");
        }
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <div style={styles.inputGroup}>
                    <label htmlFor="adminName">Admin Name</label>
                    <input
                        type="text"
                        id="adminName"
                        name="adminName"
                        value={formData.adminName}
                        onChange={handleChange}
                        
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px'
    },
    inputGroup: {
        marginBottom: '1rem'
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#D9BBF7',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};