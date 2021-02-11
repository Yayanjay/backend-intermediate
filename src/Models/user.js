const db = require('../Configs/db')
const sequelize =  require('sequelize')
const { INTEGER, where } = require('sequelize')

class Users {
    constructor() {
        this.Users =  db.sequelize.define("users", {
            user_id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_name: {
                type: sequelize.STRING,
                allowNull: false,
            },
            user_email: {
                type: sequelize.STRING,
                allowNull: false,
            },
            user_pass: {
                type: sequelize.STRING,
                allowNull: false,
            },
            user_role: {
                type: sequelize.STRING,
                allowNull: false,
            },
        })
    }

    commit() {
        return new Promise((resolve, reject) => {
            this.Users.sync()
            .then(() => {
                resolve("Successfully Created Users Table")
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    drop() {
        return new Promise((resolve, reject) => {
            this.Users.drop()
            .then(() => {
                resolve("Successfully Deleted Users Table")
            }).catch((err) => {
                console.log(err)
            });
        })
    }
    
    getAll() {
        return new Promise((resolve, reject) => {
            this.Users.findAll()
            .then((res) => {
                if (res.length == 0) {
                    resolve("Users Table is Empty")
                } else {
                    resolve(res)
                }
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    addData(data) {
        return new Promise((resolve, reject) => {
            this.Users.create({
              user_name: data.username,
              user_email: data.email,
              user_pass: data.password,
              user_role: data.role,
              
            })
            .then((res) => {
                resolve("Data Successfully Added")
            }).catch((err) => {
                console.log(err)
            });
        })
    }
    
    search(data) {
        return new Promise((resolve, reject) => {
            this.Users.findAll({
                order: [["createdAt", "DESC"]],
                where: data
            })
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    getByName(name) {
        return new Promise((resolve, reject) => {
            this.Users.findAll({
                where: {
                    user_name: name
                }
            })
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    
    getByEmail(email) {
        return new Promise((resolve, reject) => {
            this.Users.findAll({
                where: {
                    user_email: email
                }
            })
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    
    updateData(data) {
        return new Promise((resolve, reject) => {
            this.Users.update({
                user_name: data.name,
                user_email: data.email,
                user_pass: data.password
            }, {
                where: {
                    user_id: data.id
                }
            })
            .then((res) => {
                resolve("Data Successfully Updated")
            }).catch((err) => {
                console.log(err)
                reject(err)
            });
        })
    }
    
    deleteData(id) {
        return new Promise((resolve, reject) => {
            this.Users.destroy({
                where: {
                    user_id: id
                }
            })
            .then((res) => {
                resolve("Data Successfully Deleted")
            }).catch((err) => {
                console.log(err)
                reject(err)
            });
        })
    }

    
}

module.exports = new Users











// class Users {
    
//     async addUser(data) {
        
//         return new Promise((resolve, reject) => {
//             db.query(`INSERT INTO public.users(user_name, user_email, user_pass, user_role) VALUES ('${data.user_name}', '${data.user_email}', '${data.user_pass}', '${data.user_role}')`)
//                 .then((res) => {
//                     if (res.rows.length == 0) {
//                         resolve({note : "Data rak ono"})
//                     } else {
//                         resolve(res.rows)
//                     }
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }

//     async getAll() {
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT * FROM public.users ORDER BY user_id ASC`)
//                 .then((res) => {
//                     if (res.rows.length == 0) {
//                         resolve({note : "Data gaonok"})
//                     } else {
//                         resolve(res.rows)
//                     }
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }
//     async updateUser(data) {
//         return new Promise((resolve, reject) => {
//             db.query(`UPDATE public.users SET user_name='${data.user_name}', user_email='${data.user_email}', user_pass='${data.user_pass}', user_role='${data.user_role}' WHERE user_id='${data.user_id}' `)
//                 .then((res) => {
//                     if (res.rows.length == 0) {
//                         resolve({note : "data ne wes didandani"})
//                     } else {
//                         resolve(res.rows)
//                     }
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }
//     async deleteUser(id) {
//         return new Promise((resolve, reject) => {
//             db.query(`DELETE FROM public.users WHERE user_id=${id}`)
//                 .then((res) => {
//                     if (res.rows.length == 0) {
//                         resolve({note : "data ne wes di busek"})
//                     } else {
//                         resolve(res.rows)
//                     }
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }
//     async getByEmail(email) {
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT * FROM public.users WHERE user_email='${email}'`)
//                 .then((res) => {
//                     resolve(res.rows)
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }
//     async getByName(name) {
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT * FROM public.users WHERE user_name='${name}'`)
//                 .then((res) => {
//                     resolve(res.rows)
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }
//     async getByRole(role) {
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT * FROM public.users WHERE user_role='${role}'`)
//                 .then((res) => {
//                     resolve(res.rows)
//                 })
//                 .catch((err) => {
//                     reject(err)
//                 })
//         })
//     }

// }

// module.exports = new Users()