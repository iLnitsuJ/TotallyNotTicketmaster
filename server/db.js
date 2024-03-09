const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "banana",
    host: "localhost",
    port: 5432,
    database: "ticketmanager"
});

module.exports = pool;