const products = {}
const model = require('../Models/product')
const respons = require('../Helpers/respons')
const cloudUpload = require('../Helpers/cloudUpload')
const {redisdb} = require('../Configs/redis')

products.getProd = async (req,res) => {
    try {
        const result = await model.readProd()
        const saveToRedis = JSON.stringify(result)

        redisdb.setex("product", 300, saveToRedis)
        console.log("from Postgresql")
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}

products.addProd = async (req,res) => {
    try {
        if(req.file === undefined) {
            return respons(res, 500, { msg: "image harus diisi"})
        }
        const image_url = await cloudUpload(req.file.path)
        const result = await model.createProd(req.body, image_url)
        redisdb.del("product")

        return respons(res, 200, result)
    } catch (error) {
        console.log(error);
        return respons(res, 400, error)
    }
}

products.update = async (req,res) => {
    try {
        if(req.file === undefined) {
            return respons(res, 500, { msg: "image harus diisi"})
        }
        const image_url = await cloudUpload(req.file.path)
        const hasil = await model.updateProd(req.body, image_url)
        redisdb.del("product")
        return respons(res, 200, hasil)
    } catch (error) {
        console.log(error)
        return respons(res, 400, error)
    }
}
products.delete = async (req,res) => {
    try {
        const result = await model.deleteProd(req.params.id)
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}
products.search = async (req,res) => {
    try {
        const result = await model.searchProd(req.params.name)
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}
products.ordered = async (req,res) => {
    try {
        const result = await model.orderedProd(req.query.sortBy, req.query.type)
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}

module.exports = products

