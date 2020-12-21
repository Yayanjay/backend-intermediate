const db = require('../Configs/db')

class Users {
    
    async addUser(data) {
        
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO public.users(user_name, user_email, user_pass, user_role) VALUES ('${data.user_name}', '${data.user_email}', '${data.user_pass}', '${data.user_role}')`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve({note : "Data rak ono"})
                    } else {
                        resolve(res.rows)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM public.users ORDER BY user_id ASC`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve({note : "Data gaonok"})
                    } else {
                        resolve(res.rows)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async updateUser(data) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE public.users SET user_name='${data.user_name}', user_email='${data.user_email}', user_pass='${data.user_pass}', user_role='${data.user_role}' WHERE user_id='${data.user_id}' `)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve({note : "data ne wes didandani"})
                    } else {
                        resolve(res.rows)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM public.users WHERE user_id=${id}`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve({note : "data ne wes di busek"})
                    } else {
                        resolve(res.rows)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async getByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM public.users WHERE user_email='${email}'`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async getByName(name) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM public.users WHERE user_name='${name}'`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async getByRole(role) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM public.users WHERE user_role='${role}'`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

}

module.exports = new Users()