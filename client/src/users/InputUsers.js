import React, { Fragment, useState } from "react";

const InputUsers = () => {

    const [userid, setUserid] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState(null);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {userid, firstname, lastname, email, birthday}
            console.log(JSON.stringify(body))
            await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => validateResponse(data));
        } catch (err) {
            console.error(err.message)
        }
    }

    const validateResponse = async (data) => {
        if ("error" in data) {
            setError(data.error);
        } else {
            setError("No");
        }
    }

    const validate = () => {
        return userid.length && firstname.length && lastname.length && email.length && birthday.length;
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Add User</h1>
            <form onSubmit={onSubmitForm} style={{justifyContent: "center", textAlign: "center"}}>
            
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    UserID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="number" className="form-control mt-3" placeholder="Enter UserID" value={userid} onChange={e =>
                setUserid(e.target.value)}/>
                </label>
                </p>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    First Name: &nbsp;&nbsp;
                    <label>
                        <input type="text" className="form-control" placeholder="Enter First Name" value={firstname} onChange={e =>
                setFirstname(e.target.value.replace(/[^a-z]/gi, ""))}/>
                </label>
                </p>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    Last Name:&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="text" className="form-control" placeholder="Enter Last Name" value={lastname} onChange={e =>
                setLastname(e.target.value.replace(/[^a-z]/gi, ""))}/>
                </label>
                </p>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label><input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={e =>
                setEmail(e.target.value.replace(/[^a-z@.]/gi, ""))}/>
                </label>
                </p>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    Birthday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="date" className="form-control" max="2022-04-12" value={birthday} onChange={e =>
                setBirthday(e.target.value.replace(/[^0-9-]*$/gmi, ""))}required/>
                </label>
                </p>    
                <p><button className="btn btn-success" disabled={!validate()}>Add</button></p>
                <div style={{fontSize: 20, fontWeight: "bold", color: "red"}}>{error && (error !== "No")&&<div>{error}</div>}</div>       
                <div style={{fontSize: 20, fontWeight: "bold", color: "lawngreen"}}>{(error == "No") &&<div>User Added! (Refresh)</div>}</div>           
            </form>
        </Fragment>
        
    )
}

export default InputUsers;