const pool = mysql.createPool({
    connectionLimit: 100,
    host: "l0ebsc9jituxzmts.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "o3jbsof69fg94bs8",
    password: "gqw33e8mhofjyexp",
    database: "wzn3hb0ra6xy1my8"
})

module.exports = pool;