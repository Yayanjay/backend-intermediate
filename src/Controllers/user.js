/* eslint-disable no-unreachable */
const model = require('../Models/user')
const respons = require('../Helpers/respons')
const hashPassword = require('../Helpers/hash')

class Users {
    async addUser(req, res) {
        try {

            const checkName = await model.getByName(req.body.user_name)

            if (checkName.length > 0) {
                return respons(res, 401, { msg : "username sudah dipakai, coba gunakan yang lain"})
                
            }
            const checkMail = await model.getByEmail(req.body.user_email)

            if (checkMail.length > 0) {
                return respons(res, 401, { msg : "email sudah terdaftar silakan login"})
                
            }

            const newPassword = await hashPassword(req.body.user_pass)
            const users = {
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_role: req.body.user_role,
                user_pass: newPassword
            }
            const data = model.addUser(users)
            return respons(res, 200, data)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }

    async updateUser(req, res) {
        try {
            console.log(req.body)
            const newPassword = await hashPassword(req.body.user_pass)
            const users = {
                user_id: req.body.user_id,
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_role: req.body.user_role,
                user_pass: newPassword
            }
            const result = await model.updateUser(users)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }
    async deleteUser(req, res) {
        try {
            const result = await model.deleteUser(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }

    async getAll(req, res) {
        try {
            
            const result = await model.getAll()
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    }
}

module.exports = new Users()