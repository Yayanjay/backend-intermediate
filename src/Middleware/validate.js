const respon = require('../Helpers/respons');
const jwt = require('jsonwebtoken');


const cekToken = (role) => {
    return function (req, res, next) {
        const { authkey } = req.headers
        let isAllowed = false
        if (!authkey) {
            const result = {
                msg: "anda belum login"
            }
            return respon(res, 401, result)
        }

        jwt.verify(authkey, process.env.JWT_KEYS, (err, decode) => {
            
            if (err) {
                return respon(res, 401, err )
            }
            role.map((value) => {
                if (value == decode.role) {
                    isAllowed = true
                }
            })
            if (isAllowed) {
                next()
            } else {
                respon(res, 401, {msg: "your role is user, you are not allowed"})
            }
        })
    }
}

module.exports = cekToken