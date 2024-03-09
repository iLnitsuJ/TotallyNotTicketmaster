import React, {Fragment, useEffect, useState} from "react";

const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState(null);

    // Delete User function

    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => validateResponse(data));

            setUsers(users.filter(user => user.userid !== id));
        } catch (err) {
            console.error(err.message)
        }
    }

    const validateResponse = async (data) => {
      if ("success" in data) {
          setSuccess(data.success);
      }
  }

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users")
            const jsonData = await response.json()

            setUsers(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return <Fragment>
      <form className="mt-4" style={{justifyContent: "center", textAlign: "center"}}>
      <div style={{fontSize: 20, fontWeight: "bold", color: "lawngreen"}}>{success&&<div>{success}</div>}</div>
      </form>
      <table className="table table-dark table-striped mt-5 text-center">
    <thead>
      <tr>
        <th>UserID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Birthday</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {users.map(user => (
            <tr key={user.userid}>
                <td>{user.userid}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>
                    <button className="btn btn-danger" color="#ff5c5c" onClick={() => deleteUser(user.userid)}>Delete</button>
                </td>
            </tr>
        ))}
    
      
    </tbody>
  </table></Fragment>
};

export default ListUsers;

