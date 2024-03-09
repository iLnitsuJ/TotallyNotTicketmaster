import React, {Fragment, useEffect, useState} from "react";

import EditTickets from "./EditTickets";

const ListTickets = () => {

    const [tickets, setTickets] = useState([]);
    const [column, setColumn] = useState("");
    const [val, setVal] = useState("");
    const [success, setSuccess] = useState(null);
    const [success1, setSuccess1] = useState(null);

    // Delete ticket function

    const deleteTicket = async (id) => {
        try {
            await fetch(`http://localhost:5000/tickets/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => validateResponse(data));

            setTickets(tickets.filter(ticket => ticket.ticketid !== id));
        } catch (err) {
            console.error(err.message)
        }
    }

    const validateResponse = async (data) => {
      if ("success" in data) {
          setSuccess(data.success);
      }
  }

    const deleteTicketByValue = async e => {
      e.preventDefault();
      try {
          await fetch(`http://localhost:5000/tickets/del/${column}/${val}`, {
              method: "DELETE"
          })
          .then(res => res.json())
          .then(data => validateResponse2(data));
      } catch (err) {
          console.error(err.message)
      }
  }

  const validateResponse2 = async (data) => {
    if ("success" in data) {
        setSuccess1(data.success);
    } else {
        setSuccess1("No");
    }
}

    const getTickets = async () => {
        try {
            const response = await fetch("http://localhost:5000/tickets")
            const jsonData = await response.json()

            setTickets(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }

    const validate = () => {
      return column.length && val.length;
  }

    useEffect(() => {
        getTickets();
    }, [])

    return <Fragment>
      <form className="mt-4" style={{justifyContent: "center", textAlign: "center"}}>
        <label>
        <div style={{fontSize: 20, fontWeight: "bold", color: "lawngreen"}}>{success&&<div>{success}</div>}</div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#deleteModal"}>
      Delete By Value
    </button>
    
    <div className="modal" id={"deleteModal"} data-toggle="static">
      <div className="modal-dialog">
        <div className="modal-content">
    
          <div className="modal-header">
            <h4 className="modal-title">Delete Tickets</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
    
          <div className="modal-body">
            <input type="text" className="form-control" placeholder="Enter Column" value={column} onChange={e => setColumn(e.target.value.replace(/[^a-z]/gi, ""))}/>
            <input type="text" className="form-control" placeholder="Enter Value" value={val} onChange={e => setVal(e.target.value.replace(/[^a-z0-9-]/gi, ""))}/>
          </div>
    
          <div className="modal-footer">
          <div style={{fontSize: 20, fontWeight: "bold", color: "lawngreen"}}>{success1&&success1!=="No"&&<div>Row(s) Deleted (Refresh)</div>}</div>
        <div style={{fontSize: 20, fontWeight: "bold", color: "red"}}>{success1=="No"&&<div>Column Not Found</div>}</div>
          <button type="button" className="btn btn-primary" disabled={!validate()} onClick={e => deleteTicketByValue(e)}>Delete</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
    
        </div>
      </div>
    </div>
        </label>
      </form>
      <table className="table table-dark table-striped mt-4 text-center">
    <thead>
      <tr>
        <th>TicketID</th>
        <th>Price</th>
        <th>Type</th>
        <th>Artist</th>
        <th>Date</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {tickets.map(ticket => (
            <tr key={ticket.ticketid}>
                <td>{ticket.ticketid}</td>
                <td>{ticket.price}</td>
                <td>{ticket.type}</td>
                <td>{ticket.artist}</td>
                <td>{ticket.date}</td>
                <td><EditTickets ticket={ticket} /> </td>
                <td>
                    <button className="btn btn-danger" color="#ff5c5c" onClick={() => deleteTicket(ticket.ticketid)}>Delete</button>
                </td>
            </tr>
        ))}   
      
    </tbody>
  </table></Fragment>
};

export default ListTickets;

