/* eslint-disable no-unreachable */
const model = require('../Models/user')
const respons = require('../Helpers/respons')
const hashPassword = require('../Helpers/hash')

class Users {

    async commit(req, res) {
        try {
            const result = await model.commit()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }
    async drop(req, res) {
        try {
            const result = await model.drop()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
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
    async getBy(req, res) {
        try {
            const {name, email, role} = req.query
            const data = {}
            let result = ""

            if (name) {
                data.user_name = name
            }
            if (email) {
                data.user_email = email
            }
            if (role) {
                data.user_role = role
            }

            if (Object.keys(data).length === 0) {
                result = await model.getAll()
            } else {
                result = await model.search(data)
            }

            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    }
    async addUser(req, res) {
        try {
            const checkName = await model.getByName(req.body.username)

            if (checkName.length > 0) {
                return respons(res, 401, { msg : "username sudah dipakai, coba gunakan yang lain"})
                
            }
            const checkMail = await model.getByEmail(req.body.email)

            if (checkMail.length > 0) {
                return respons(res, 401, { msg : "email sudah terdaftar silakan login"})
                
            }

            const newPassword = await hashPassword(req.body.password)
            const users = {
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                password: newPassword
            }
            const result = await model.addData(users)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }
    }
    async updateUser(req, res) {
        try {
            console.log(req.body)
            const newPassword = await hashPassword(req.body.password)
            const users = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: newPassword
            }
            const result = await model.updateData(users)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }    
    async deleteUser(req, res) {
        try {
            const result = await model.deleteData(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }
}

module.exports = new Users()



// async addUser(req, res) {
//     try {

//         const checkName = await model.getByName(req.body.user_name)

//         if (checkName.length > 0) {
//             return respons(res, 401, { msg : "username sudah dipakai, coba gunakan yang lain"})
            
//         }
//         const checkMail = await model.getByEmail(req.body.user_email)

//         if (checkMail.length > 0) {
//             return respons(res, 401, { msg : "email sudah terdaftar silakan login"})
            
//         }

//         const newPassword = await hashPassword(req.body.user_pass)
//         const users = {
//             user_name: req.body.user_name,
//             user_email: req.body.user_email,
//             user_role: req.body.user_role,
//             user_pass: newPassword
//         }
//         const data = model.addUser(users)
//         return respons(res, 200, data)
//     } catch (error) {
//         console.log(error)
//         return respons(res, 400, error)
//     }
// }

// async updateUser(req, res) {
//     try {
//         console.log(req.body)
//         const newPassword = await hashPassword(req.body.user_pass)
//         const users = {
//             user_id: req.body.user_id,
//             user_name: req.body.user_name,
//             user_email: req.body.user_email,
//             user_role: req.body.user_role,
//             user_pass: newPassword
//         }
//         const result = await model.updateUser(users)
//         return respons(res, 200, result)
//     } catch (error) {
//         console.log(error)
//         return respons(res, 400, error)
//     }
// }
// async deleteUser(req, res) {
//     try {
//         const result = await model.deleteUser(req.params.id)
//         return respons(res, 200, result)
//     } catch (error) {
//         console.log(error)
//         return respons(res, 400, error)
//     }
// }

// async getAll(req, res) {
//     try {
        
//         const result = await model.getAll()
//         return respons(res, 200, result)
//     } catch (error) {
//         console.log(error)
//         return respons(res, 500, error)
//     }
// }