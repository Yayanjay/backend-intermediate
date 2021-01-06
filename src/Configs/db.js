/* eslint-disable no-undef */
const {Pool} = require('pg')

const db = new Pool({
    database : process.env.DBNAME,
    user : process.env.DBUSER,
    password : process.env.DBPASS,
    host : "localhost",
    port : process.env.DBPORT
})

module.exports = db;
