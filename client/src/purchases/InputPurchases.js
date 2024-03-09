import React, { Fragment, useState } from "react";

const InputPurchases = () => {

    const [purchaseid, setPurchaseid] = useState("");
    const [userid, setUserid] = useState("");
    const [ticketid, setTicketid] = useState("");
    const [error, setError] = useState(null);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {purchaseid, userid, ticketid}
            await fetch("http://localhost:5000/purchases", {
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
            if (data["error"].includes("purchases_userid_fkey")) {
                setError("UserID Not Found");
            } else if (data["error"].includes("purchases_ticketid_fkey")) {
                setError("TicketID Not Found");
            } else {
                setError("Duplicate PurchaseID");
            }
        } else {
            setError("No");
        }
    }

    const validate = () => {
        return purchaseid.length && userid.length && ticketid.length;
        
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Add Purchase</h1>
            <form onSubmit={onSubmitForm} style={{justifyContent: "center", textAlign: "center"}}>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    PurchaseID: &nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="number" className="form-control mt-3" placeholder="Enter PurchaseID" value={purchaseid} onChange={e =>
                setPurchaseid(e.target.value)}/>
                </label>
                </p>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    UserID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="number" className="form-control" placeholder="Enter UserID" value={userid} onChange={e =>
                setUserid(e.target.value)}/>
                </label>
                </p>
                <p style={{fontSize: 20, fontWeight: "bold"}}>
                    TicketID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="number" className="form-control" placeholder="Enter TicketID" value={ticketid} onChange={e =>
                setTicketid(e.target.value)}/>
                </label>
                </p>    
                <button className="btn btn-success" disabled={!validate()}>Add</button>
                <div style={{fontSize: 20, fontWeight: "bold", color: "red"}}>{error && (error !== "No")&&<div>{error}</div>}</div>       
                <div style={{fontSize: 20, fontWeight: "bold", color: "lawngreen"}}>{(error == "No") &&<div>Purchase Added! (Refresh)</div>}</div>   
            </form>
        </Fragment>
        
    )
}

export default InputPurchases;