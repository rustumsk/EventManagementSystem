import { useState } from "react";
export default function ProfileSec({user, userIcon}){
    const [studentName, setStudentName] = useState(user.fullname? user.fullname: user.sbo_name);
    const [studentEmail, setStudentEmail] = useState(user.student_email? user.student_email: user.sbo_email);
    const [editable, setEditable] = useState(false);

    const [originalName, setOriginalName] = useState(user.fullname? user.fullname: user.sbo_name);
    const [originalEmail, setOriginalEmail] = useState(user.student_email? user.student_email: user.sbo_email);

    const handleCancelEdit = () => {
        setStudentName(originalName);
        setStudentEmail(originalEmail); 
        setEditable(false); 
    };
    return(
        <section className="sb-spout">
            <section className="sb-pcont">
                <header className="sb-pd">Personal Details</header>
                <section className="sb-dbody">
                    <div className="sb-dinp">
                        <header className="sb-dfd">
                            <section className="sb-dfdi">
                                <span style={{
                                    backgroundImage: `url(${userIcon})`,
                                }}></span>
                            </section>
                            <section className="sb-dfdp">
                                <p className="sb-dfdn">{studentName}</p>
                                <p className="sb-dfde">{studentEmail}</p>
                            </section>
                        </header>
                        <section className="sb-dfb">
                            <div className="dfb-cont">
                                <label htmlFor="dname">Full Name</label>
                                <input type="text" id="dname" name="dname" value={studentName} onChange={(e) =>{
                                    setStudentName(e.target.value);
                                }} readOnly={!editable}/>

                                <label htmlFor="demail">Email</label>
                                <input type="text" id="dname" name="dname" value={studentEmail} onChange={(e) =>{
                                    setStudentEmail(e.target.value)
                                }} readOnly={!editable}/>
                            </div>
                        </section>
                    </div>
                    <div className="sb-dimg">
                        <span style={{backgroundImage: `url(${userIcon})`}}>
                            {editable? <div> </div>: <></>}
                        </span>
                    </div>
                </section>
                <section className="sb-dbtns">
                    {editable? <button className="bc" onClick={handleCancelEdit}> Cancel Edit </button>: <button onClick={() =>{
                        setEditable(!editable)
                    }}>Edit</button>}
                    <button>Save Changes</button>
                </section>
            </section>
        </section>
    )
}