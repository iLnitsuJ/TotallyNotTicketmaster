import React, {Fragment, useState} from "react";

const EditTickets = ({ticket}) => {
    const currentDate = new Date(ticket.date).toISOString().substring(0,10) 
    const [price, setPrice] = useState(ticket.price);
    const [type, setType] = useState(ticket.type);
    const [artist, setArtist] = useState(ticket.artist);
    const [date, setDate] = useState(currentDate);
    const [success, setSuccess] = useState(null);

    // Edit Ticket function
    const updateTicket = async e => {
        e.preventDefault();
        try {
            const body = {price, type, artist, date}
            await fetch(`http://localhost:5000/tickets/${ticket.ticketid}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => validateResponse(data));
        } catch (err) {
            console.error(err.message)
        }
    }

    const validateResponse = async (data) => {
      if ("success" in data) {
          setSuccess(data.success);
      }
  }

    const resetAll = async e => {
      setPrice(ticket.price)
      setType(ticket.type)
      setArtist(ticket.artist)
      setDate(new Date(ticket.date).toISOString().substring(0,10))
    }


    return <Fragment>
    <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${ticket.ticketid}`}>
      Edit
    </button>
    
    <div className="modal" id={`id${ticket.ticketid}`} data-toggle="static">
      <div className="modal-dialog">
        <div className="modal-content">
    
          <div className="modal-header">
            <h4 className="modal-title">Edit Ticket</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
    
          <div className="modal-body">
            <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
            <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value.replace(/[^a-z]/gi, ""))}/>
            <input type="text" className="form-control" value={artist} onChange={e => setArtist(e.target.value.replace(/[^a-z]/gi, ""))}/>
            <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value.replace(/[^0-9-]*$/gmi, ""))}/>
          </div>
    
          <div className="modal-footer">
            <h5 style={{fontSize: 20, fontWeight: "bold", color: "lawngreen"}}>{success&&<div>{success}</div>}</h5>
          <button type="button" className="btn btn-warning" onClick={e => updateTicket(e)}>Edit</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => resetAll()}>Close</button>
          </div>
    
        </div>
      </div>
    </div></Fragment>
};

export default EditTickets;