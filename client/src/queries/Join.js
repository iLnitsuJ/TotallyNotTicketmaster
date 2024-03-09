import React, {Fragment, useState} from "react";

const Join = () => {

    const [join, setJoin] = useState([]);
    const [artist, setArtist] = useState("");

    const getJoin = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/tickets/join/${artist}`)
            const jsonData = await response.json()
            setJoin(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }


    return <Fragment>
        <h1 className="mt-3 text-center">JOIN</h1>
        <h3 className="mt-3 text-center">Returns all users who own a ticket for a given artist</h3>
        <table className="table table-dark table-striped mt-3 text-center">
    <thead>
      <tr>
        <th>UserID</th>
        <th>TicketID</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
    </thead>
    <tbody> 
        {join.map(a => (
            <tr key={a.userid}>
                <td>{a.userid}</td>
                <td>{a.ticketid}</td>
                <td>{a.firstname}</td>
                <td>{a.lastname}</td>
            </tr>
        ))}
    </tbody>
  </table>
    <label>
    <form onSubmit={getJoin} className="d-flex">
                <input type="text" className="form-control mt-5" placeholder="Enter Artist" value={artist} onChange={e =>
                setArtist(e.target.value.replace(/[^a-z]/gi, ""))}/>       
                <button className="btn btn-info mt-5" >Query</button>
                
    </form>
    </label>
  
  
  
  
  
  
  
  
  
  
  </Fragment>
};

export default Join;

