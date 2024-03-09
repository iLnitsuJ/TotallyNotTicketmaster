import React, {Fragment, useState} from "react";

const Selection = () => {

    const [selection, setSelection] = useState([]);
    const [firstname, setFirstname] = useState("");

    const getSelection = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/select/${firstname}`)
            const jsonData = await response.json()
            setSelection(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }


    return <Fragment>
        <h1 className="mt-3 text-center">SELECTION</h1>
        <h3 className="mt-3 text-center">Returns all users who's first name matches the given name</h3>
        <table className="table table-dark table-striped mt-3 text-center">
    <thead>
      <tr>
        <th>UserID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Birthday</th>
      </tr>
    </thead>
    <tbody> 
        {selection.map(a => (
            <tr key={a.userid}>
                <td>{a.userid}</td>
                <td>{a.firstname}</td>
                <td>{a.lastname}</td>
                <td>{a.email}</td>
                <td>{a.birthday}</td>
            </tr>
        ))}
    </tbody>
  </table>
  <label>
    <form onSubmit={getSelection} className="d-flex">
                <input type="text" className="form-control mt-5" placeholder="Enter First Name" value={firstname} onChange={e =>
                setFirstname(e.target.value.replace(/[^a-z]/gi, ""))}/>       
                <button className="btn btn-info mt-5" >Query</button>                
    </form>
    </label>
  </Fragment>
};

export default Selection;

