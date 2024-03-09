import React, {Fragment, useEffect, useState} from "react";

const ListPurchases = () => {

    const [purchases, setPurchases] = useState([]);

    const getPurchases = async () => {
        try {
            const response = await fetch("http://localhost:5000/purchases")
            const jsonData = await response.json()

            setPurchases(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getPurchases();
    }, [])

    return <Fragment><table className="table table-dark table-striped mt-3 text-center">
    <thead>
      <tr>
        <th>PurchaseID</th>
        <th>UserID</th>
        <th>TicketID</th>
      </tr>
    </thead>
    <tbody>
        {purchases.map(p => (
            <tr key={p.purchaseid}>
                <td>{p.purchaseid}</td>
                <td>{p.userid}</td>
                <td>{p.ticketid}</td>
            </tr>
        ))}
    
      
    </tbody>
  </table></Fragment>
};

export default ListPurchases;

