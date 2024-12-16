import '../../styles/components/SBODashboard/sboapproval.scss';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import getStudent from '../../services/studentServices/getStudent';
import { updateStudentStatus } from '../../services/studentServices/updateStudent';
import { deleteStudentById } from '../../services/studentServices/deleteStudent';

export default function SBOApproval({sbo, authToken}) {
    const [btnStatus, setBtnStatus] = useState("noaction");
    const [students, setStudents] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const clickDeleteIcon = () =>{
        if (btnStatus === 'delete'){
            setBtnStatus('noaction');
            return;
        }
        setBtnStatus('delete');
    }
    const clickEditIcon = () =>{
        if (btnStatus === 'approve'){
            setBtnStatus('noaction');
            return;
        }
        setBtnStatus('approve');
    }
    const deleteApplication = async(student) =>{
        try{
            const result = await deleteStudentById(authToken, student.student_id);
            if(result){
                toast.success("Student Application Denied!");
                setRefresh(prev => !prev);
            }
        }catch(e){
            console.log(e);
            toast.error("Something went wrong denying the application!");
        }
    }
    const UpdateStatus = async(student) =>{
        if(student.is_verified){
            toast.warn("Student is already verified!");
            return;
        }
        try{
            const result = await updateStudentStatus(authToken, student.student_id);
            if(result){
                toast.success("Student Verified!!");
                setRefresh(prev => !prev);
            }
        }catch(e){
            console.log(e);
            toast.error("Something went wrong verifying the student!")
        }
    };
    
    useEffect(() =>{
        const getAllStudent = async() =>{
            try{
                const data = await getStudent.getAllStudentBySbo(authToken, sbo.sbo_name);
                console.log(data);
                setStudents(data);
            }catch(e){  
                console.log(e);
            }
        }
        getAllStudent();
    },[refresh]);

    return (
        <div className="sbo-cont">
            <ToastContainer />
            <section className="cont">
                <header className="sba-header">
                    {console.log(students)}
                    <h2>{sbo.sbo_name}</h2>
                    <span className='sb-ad'>SBO Admin</span>
                    <h3>Review and Approve Student Registrations</h3>
                    <p>Review pending accounts and manage verification status for SBO's</p>
                </header>
                <div className="filters">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <div className="btn-cont">
                        <button className="edit-btn" onClick={clickEditIcon}></button>
                        <button className="delete-btn" onClick={clickDeleteIcon}></button>
                    </div>
                </div>
                <table className="sba-table">
                    <thead>
                        <tr className="table-header">
                            <th>Student Id Number</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student =>{
                            return(
                                <tr className="table-rows">
                                    <td>{student.id_num}</td>
                                    <td>{student.fullname}</td>
                                    <td>{student.student_email}</td>
                                    {console.log(student.is_verified)}
                                    <td>{student.is_verified? <span style={{color: 'green', fontSize: '1.2rem'}}>Verified</span >:<span style={{color: 'red', fontSize: '1.2rem'}}>Pending</span> }</td>
                                    <td>
                                    {
                                        btnStatus === 'noaction' ? (
                                            <button>No Action</button>
                                        ) : btnStatus === 'delete' ? (
                                            <button className="reject-btn" onClick={() => deleteApplication(student)}>✖</button>
                                        ) : btnStatus === 'approve' ? (
                                            <button className="approve-btn" onClick={() => UpdateStatus(student)}>✔</button>
                                        ) : null
                                    }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
