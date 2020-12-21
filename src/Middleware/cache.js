/* eslint-disable no-unused-vars */
const respon = require('../Helpers/respons')
const {redisdb} = require('../Configs/redis')
const { json } = require('body-parser')

const getAll = (req, res, next) => {
    redisdb.get("product", (error, data) => {
        if (error) {
            return respon(res, 500, error)
        }

        if (data !== null) {

            const result = JSON.parse(data)
            console.log("from Redis")
            return respon(res, 200, result)
        } else {
            next()
        }
    })
}

module.exports = getAll