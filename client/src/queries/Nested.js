import React, {Fragment, useState} from "react";

const Nested = () => {

    const [nested, setNested] = useState([]);

    const getNested = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/nested`)
            const jsonData = await response.json()
            setNested(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }


    return <Fragment>
        <h1 className="mt-5 text-center">NESTED</h1>
        <h3 className="mt-3 text-center">Returns the average number of tickets owned per user</h3>
        <table className="table table-dark table-striped mt-3 text-center">
    <thead>
      <tr>
        <th>Average # of Tickets Owned Per User</th>
        <th>Rounded Down</th>
      </tr>
    </thead>
    <tbody> 
        {nested.map(a => (
            <tr key={a.avg}>
                <td>{a.avg}</td>
                <td>{Math.floor(a.avg)}</td>
            </tr>
        ))}
    </tbody>
  </table>

    <form onSubmit={getNested} className="d-flex">   
                <button className="btn btn-info mt-5" >Query</button>
                
    </form>
  
  </Fragment>
};

export default Nested;

