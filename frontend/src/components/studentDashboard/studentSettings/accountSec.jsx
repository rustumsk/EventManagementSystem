import { useState } from "react";
export default function AccountSec() {
    const [editable, setEditable] = useState(false);

    const clickEditable = (e) =>{
        e.preventDefault();
        setEditable(!editable);
    }
    return (
        <section className="sb-ascont">
            <form>
                <div>
                    <label htmlFor="cpass1">Current Password: </label>
                    <input type="password" id="cpass1" placeholder="Enter Current Password" readOnly={!editable} disabled={!editable}/>
                </div>
                <div>
                    <label htmlFor="npass">New Password: </label>
                    <input type="password" id="npass" placeholder="Enter new password" readOnly={!editable} disabled={!editable}/>
                </div>
                <div>
                    <label htmlFor="cnpass">Confirm New Password: </label>
                    <input type="password" id="cnpass" placeholder="Confirm new password" readOnly={!editable} disabled={!editable}/>
                </div>
                <div className="cbutton">
                    <button onClick={clickEditable} className={editable? 'cc':null }>{editable? "Cancel":"Change Password" }</button>
                    {editable? <button> Confirm Password Change </button>: null}
                </div>
            </form>
        </section>
    );
}