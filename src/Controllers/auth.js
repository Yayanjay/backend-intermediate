const bcr = require('bcrypt')
const model = require('../Models/user')
const respons = require('../Helpers/respons')
const jwt = require('jsonwebtoken')


class Auth {
    
    login = async  (req, res) => {
        try {

            const passDB = await model.getByEmail(req.body.user_email)
            const passUser = req.body.user_pass

            if (passDB.length <= 0 ) {
                respons(res, 200, {msg: "email tidak terdaftar, silakan registrasi terlebih dahulu"})
            }

            const cekPass =  await bcr.compare(passUser, passDB[0].user_pass)
            
            if (cekPass) {
                
                const result = await this.setToken(req.body.user_email, passDB[0].user_role)
                respons(res, 200, result)
            } else {
                respons(res, 200, {msg: "cek password anda"})
            }
        } catch (error) {
            console.log(error)
            return respons(res, 500, error)
        }

    }
    
    
    setToken = async (email, role) => {
        try {
            const payload = {
                email: email,
                role: role
            }
            const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: 1000})
            const result = {
                msg: "Succesfully created token",
                token: token,
                role: payload.role
            }
            return result
        } catch (error) {
            throw error
        }
    }
}


module.exports = new Auth()

