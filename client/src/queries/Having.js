import React, {Fragment, useState} from "react";

const Having = () => {

    const [having, setHaving] = useState([]);

    const getHaving = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/having`)
            const jsonData = await response.json()
            setHaving(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }


    return <Fragment>
        <h1 className="mt-5 text-center">HAVING</h1>
        <h3 className="mt-3 text-center">Returns average price of sold tickets for each type with average greater than 20</h3>
        <table className="table table-dark table-striped mt-3 text-center">
    <thead>
      <tr>
        <th>Type</th>
        <th>Average Price of Sold Tickets</th>
      </tr>
    </thead>
    <tbody> 
        {having.map(a => (
            <tr key={a.type}>
                <td>{a.type}</td>
                <td>{a.avg}</td>
            </tr>
        ))}
    </tbody>
  </table>

    <form onSubmit={getHaving} className="d-flex">   
                <button className="btn btn-info mt-5" >Query</button>
    </form>
  
  
  
  
  
  
  
  
  
  
  </Fragment>
};

export default Having;

