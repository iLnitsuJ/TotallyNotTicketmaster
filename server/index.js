const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// INSERT - Add new purchase
app.post("/purchases", async(req, res) => {
    try {
        const {purchaseid, userid, ticketid} = req.body;
        const newPurchase = await pool.query("INSERT INTO purchases (purchaseid, userid, ticketid)" +
                                            " VALUES($1, $2, $3) RETURNING *",
         [purchaseid, userid, ticketid]);

         res.json(newPurchase.rows[0]);
    } catch (error) {
        res.json({error: error.message});
        console.log(error.message);
    }
})

// DELETE - Delete ticket by value
app.delete("/tickets/del/:column/:val", async (req, res) => {
    try {
        const column = req.params.column;
        const val = req.params.val;
        await pool.query(`DELETE FROM tickets WHERE ${column} = $1`, [val])
        res.json({success: "Row(s) Deleted"});
    } catch (err) {
        res.json({error: "Column Not Found"});
        console.log(err.message)
    }
})

// UPDATE - Ticket information
app.put("/tickets/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const price = req.body.price;
        const type = req.body.type;
        const artist = req.body.artist;
        const date = req.body.date;
        await pool.query("UPDATE tickets SET price = $1, type = $2, artist = $3, date = $4 WHERE ticketid = $5", [price, type, artist, date, id])

        res.json({success: "Row Updated (Refresh)"});
    } catch (err) {
        console.error(err.message)
    }
})

// SELECTION - Only show users of specific first name
app.get("/select/:firstname", async (req, res) => {
    try {
        const {firstname} = req.params;
        const tickets = await pool.query("SELECT * FROM users WHERE firstname = $1", [firstname]);

        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// PROJECTION - Show specific columns in given table
app.get("/projection/:input/:table", async (req, res) => {
    try {
        const input = req.params.input;
        const table = req.params.table;
        const users = await pool.query("SELECT " + input + " FROM " + table);
        res.json(users.rows);
    } catch (err) {
        console.error(err.message)
    }
})


// JOIN
app.get("/tickets/join/:artist", async (req, res) => {
    try {
        const {artist} = req.params;
        const tickets = await pool.query("SELECT users.userid, tickets.ticketid, users.firstname, users.lastname FROM tickets INNER JOIN purchases ON tickets.ticketid = purchases.ticketid INNER JOIN users ON purchases.userid = users.userid WHERE artist = $1", [artist]);
        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// GROUP BY
app.get("/group", async (req, res) => {
    try {
        const tickets = await pool.query("SELECT tickets.artist, COUNT(*) FROM tickets INNER JOIN purchases ON tickets.ticketid = purchases.ticketid GROUP BY tickets.artist");
       
        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// HAVING
app.get("/having", async (req, res) => {
    try {
        const tickets = await pool.query("SELECT type, AVG(price) FROM tickets GROUP BY type HAVING 20 <= AVG(price)");
       
        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// NESTED
app.get("/nested", async (req, res) => {
    try {
        const tickets = await pool.query("With userTickets AS (SELECT purchases.userid, COUNT(*) AS ticketsPurchased FROM purchases GROUP BY purchases.userid) SELECT AVG(ticketsPurchased) FROM userTickets");
       
        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// DIVISION
app.get("/division", async (req, res) => {
    try {
        const tickets = await pool.query("SELECT U.email FROM users U WHERE NOT EXISTS ((SELECT DISTINCT T.artist FROM tickets T) EXCEPT (SELECT DISTINCT T1.artist FROM purchases P, Tickets T1 WHERE P.userid = U.userid AND P.ticketid = T1.ticketid))");
        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// Additional Routes

app.post("/tickets", async(req, res) => {
    try {
        const {ticketid, price, type, artist, date} = req.body;
        const newTicket = await pool.query("INSERT INTO tickets (ticketid, price, type, artist, date)" +
                                            " VALUES($1, $2, $3, $4, $5) RETURNING *",
         [ticketid, price, type, artist, date]);
         res.json(newTicket.rows[0]);
    } catch (error) {
        res.json({error: "Duplicate TicketID"});
        console.log(error.message);
    }
})

app.post("/users", async(req, res) => {
    try {
        const {userid, firstname, lastname, email, birthday} = req.body;
        const newUser = await pool.query("INSERT INTO users (userid, firstname, lastname, email, birthday)" +
                                            " VALUES($1, $2, $3, $4, $5) RETURNING *",
         [userid, firstname, lastname, email, birthday]);

         res.json(newUser.rows[0]);
    } catch (error) {
        res.json({error: "Duplicate UserID"});
        console.log(error.message);
    }
})

app.get("/tickets", async (req, res) => {
    try {
        const allTickets = await pool.query("SELECT * FROM tickets ORDER BY ticketid ASC");
        res.json(allTickets.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users ORDER BY userid ASC");
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/purchases", async (req, res) => {
    try {
        const allPurchases = await pool.query("SELECT * FROM purchases ORDER BY purchaseid ASC");
        res.json(allPurchases.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// DELETE - Remove ticket
app.delete("/tickets/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM tickets WHERE ticketid = $1", [id])
        res.json({success: "Row Deleted"});
    } catch (err) {
        console.log(err.message)
    }
})

// DELETE - Remove users
app.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM users WHERE userid = $1", [id])

        res.json({success: "Row Deleted"});
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});