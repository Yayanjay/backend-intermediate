const {Sequelize} = require('sequelize')

class Connect {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DBNAME,
            process.env.DBUSER,
            process.env.DBPASS,
            {
                dialect: 'postgres',
                host: process.env.DBHOST,
                port: process.env.DBPORT
            }
        )
    }

    connection() {
        this.sequelize.authenticate()
        .then(() => {
            return console.log("Database Connected")
        })
        .catch(err => {
            console.log("Something Went Wrong, Cannot Connect to Database")
            console.log(err)
        })
    }
}

module.exports = new Connect()