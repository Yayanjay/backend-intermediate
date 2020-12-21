const categories = {}
const model = require('../Models/category')
const respons = require('../Helpers/respons')

categories.read = async (req,res) => {
    try {
        const result = await model.readCat()
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}
categories.create = async (req,res) => {
    try {
        const result = await model.createCat(req.body)
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}
categories.update = async (req,res) => {
    console.log(res.body)
    try {
        const result = await model.updateCat(req.body)
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}
categories.delete = async (req,res) => {
    try {
        const result = await model.deleteCat(req.body)
        return respons(res, 200, result)
    } catch (error) {
        return respons(res, 400, error)
    }
}

module.exports = categories