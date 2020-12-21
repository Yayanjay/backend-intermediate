/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv/config')
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
const routes = require('./src/main')
const db = require('./src/Configs/db')
const bodyPars = require('body-parser');
const morgan = require('morgan')
const redis = require('./src/Configs/redis')
const logger = require('./config/winston');
const winston = require('./config/winston');

app.use(bodyPars.urlencoded({extended: false}))
app.use(bodyPars.json())
app.use(morgan('combined', { stream: winston.stream }));
app.use(routes)



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorizaation')
})

db.connect()
    .then(res => {
        return console.log("Database Connected")
    })
    .catch(err => {
        console.log("Something Went Wrong, Cannot Connect to Database")
        console.log(err)
    })

redis.redisConnection()
    .then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    });

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});