const model = require('../Models/history')
const respons = require('../Helpers/respons')

module.exports = {
    commit: async (req, res) => {
        try {
            const result = await model.commit()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    },
    drop: async (req, res) => {
        try {
            const result = await model.drop()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await model.getAll()
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    },
    addData: async (req, res) => {
        try {
            const result = await model.addData(req.body)
            console.log(result)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    },
    updateData: async (req, res) => {
        try {
            const result = await model.updateData(req.body)
            console.log(result)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    },
    deleteData: async (req, res) => {
        try {
            const result = await model.deleteData(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 400, error)
        }
    }
}