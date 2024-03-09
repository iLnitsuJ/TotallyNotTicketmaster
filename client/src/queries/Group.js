import React, {Fragment, useState} from "react";

const Group = () => {

    const [group, setGroup] = useState([]);

    const getGroup = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/group`)
            const jsonData = await response.json()
            setGroup(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }


    return <Fragment>
        <h1 className="mt-5 text-center">GROUP</h1>
        <h3 className="mt-3 text-center">Returns the number of tickets sold for each artist</h3>
        <table className="table table-dark table-striped mt-3 text-center">
    <thead>
      <tr>
        <th>Artist</th>
        <th># Tickets Sold</th>
      </tr>
    </thead>
    <tbody> 
        {group.map(a => (
            <tr key={a.artist}>
                <td>{a.artist}</td>
                <td>{a.count}</td>
            </tr>
        ))}
    </tbody>
  </table>

    <form onSubmit={getGroup} className="d-flex">   
                <button className="btn btn-info mt-5" >Query</button>
                
    </form>
  
  
  
  
  
  
  
  
  
  
  </Fragment>
};

export default Group;

