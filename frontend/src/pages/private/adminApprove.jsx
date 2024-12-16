
import SBOApproval from "../../components/sboDashboard/SBOAprroval"
import '../../styles/components/SBODashboard/sboapproval.scss';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/auth";
import { getAdminById } from "../../services/adminServices/getAdmin";
import { ToastContainer, toast } from "react-toastify";
import { updateSboStatus } from "../../services/sboServices/updateSbo";
import { deleteSboById } from "../../services/sboServices/deleteSbo";
import getSbo from "../../services/sboServices/getSbo";
export default function AdminApprove(){
    const [btnStatus, setBtnStatus] = useState('noaction');
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
    const [admin, setAdmin] = useState({});
    const [sbo, setSbo] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const navigation = useNavigate();

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
    if(localStorage.getItem('adminToken') === null){
        navigation('/eulu');
    };

    const deleteApplication = async(sbo) =>{
        try{
            const result = await deleteSboById(adminToken, sbo.sbo_id);
            if(result){
                toast.success("SBO Application Denied!");
                setRefresh(prev => !prev);
            }
        }catch(e){
            console.log(e);
            toast.error("Something went wrong denying the application!");
        }
    }

    const UpdateStatus = async(sbo) =>{
        if(sbo.is_verified){
            toast.warn("SBO is already verified!");
            return;
        }
        try{
            const result = await updateSboStatus(adminToken, sbo.sbo_id);
            if(result){
                toast.success("SBO Verified!");
                setRefresh(prev => !prev);
            }
        }catch(e){
            console.log(e);
            toast.error("Something went wrong approving sbo!")
        }
    };

    useEffect(() =>{
        const trialFetch = async() =>{
            const adminTok = decodeToken(adminToken);
            try{
                const admin_id = adminTok.admin_id; 
                const adminData = await getAdminById(adminToken, admin_id);
                setAdmin(adminData);
            }
            catch(e){
                console.log(e);
            }
        }
        trialFetch();
    },[]);

    useEffect(() =>{
        const fetchSbo = async() =>{
            try{
                const data = await getSbo.getUnverified(adminToken);
                setSbo(data);
            }catch(e){
                console.log(e);
            }
        }
        fetchSbo();
    },[refresh])
    return(
        <div className="sbo-cont">
            <ToastContainer />
            <section className="cont">
                <header className="sba-header">
                    
                    <h2>{admin.admin_name}</h2>
                    <span className='sb-ad'>Admin</span>
                    <h3>Review and Approve SBO Registrations</h3>
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
                            <th>Contact Numberr</th>
                            <th>SBO Email</th>
                            <th>SBO Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sbo.map(s =>{
                            return(
                                <tr className="table-rows">
                                    <td>{s.contact_num}</td>
                                    <td>{s.sbo_name}</td>
                                    <td>{s.sbo_email}</td>
                                    <td>{s.is_verified? <span style={{color: 'green', fontSize: '1.2rem'}}>Verified</span >:<span style={{color: 'red', fontSize: '1.2rem'}}>Pending</span> }</td>
                                    <td>
                                    {
                                        btnStatus === 'noaction' ? (
                                            <button>No Action</button>
                                        ) : btnStatus === 'delete' ? (
                                            <button className="reject-btn" onClick={() => deleteApplication(s)}>✖</button>
                                        ) : btnStatus === 'approve' ? (
                                            <button className="approve-btn" onClick={() => UpdateStatus(s)}>✔</button>
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
    )
};