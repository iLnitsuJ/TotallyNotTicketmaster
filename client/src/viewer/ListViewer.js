import React, {Fragment, useState} from "react";

const ListViewer = () => {

    const [viewer, setViewer] = useState([]);
    const [input, setInput] = useState("");
    const [table, setTable] = useState("");
    const [columns, setColumns] = useState([]);

    const getViewer = async e => {
        e.preventDefault();
        setColumns(input.split(","));
        try {

            const response = await fetch(`http://localhost:5000/projection/${input}/${table}`)
            const jsonData = await response.json()
            
            setViewer(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }

    return <Fragment>
        <h1 className="mt-5 text-center">Table Viewer</h1>
        <h3 className="mt-2 text-center">Currently Viewing: {table}</h3>
        
        <form onSubmit={getViewer} className="d-flex">
                <input type="text" className="form-control mt-5" placeholder="Enter Columns (e.g. userid,firstname,email)" value={input} onChange={e =>
                setInput(e.target.value.replace(/[^a-z,]/gi, ""))}/>
                <input type="text" className="form-control mt-5" placeholder="Enter Table (e.g. users)" value={table} onChange={e =>
                setTable(e.target.value.replace(/[^a-z]/gi, ""))}/>
                <button className="btn btn-dark mt-5" >View Table</button>
                
    </form>

        <table className="table table-dark table-striped mt-3 text-center">
    <thead>
    <tr>
      {columns.map((a) => (
        <th>{a}</th>
      ))}
      </tr>
      
    </thead>
    <tbody> 
        {viewer.map((a, index) => (
            <tr>
                {Object.values(a).map((b) => (
                    <td>{b}</td>
                ))}
            </tr>
        ))}
    </tbody>
  </table>


  
  </Fragment>
};

export default ListViewer;

