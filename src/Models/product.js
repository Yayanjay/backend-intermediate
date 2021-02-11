/* eslint-disable no-unused-vars */
const db = require('../Configs/db')
const sequelize = require('sequelize')
const { resolve } = require('app-root-path')
// const products = {}

class Products {
    constructor() {
        this.Products = db.sequelize.define("products", {
            product_id: {
                type: sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            product_name: {
                type: sequelize.STRING(20),
                allowNull: false,
            },
            product_price: {
                type: sequelize.STRING(50),
                allowNull: false,
            },
            product_image: {
                type: sequelize.STRING,
                allowNull: false,
            },
            product_category: {
                type: sequelize.STRING,
                allowNull: false,
            },
        })
    }

    commit() {
        return new Promise((resolve, reject) => {
            this.Products.sync() 
                .then((result) => {
                    resolve("Product Table Successfully Created")
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    drop() {
        return new Promise((resolve, reject) => {
            this.Products.drop() 
                .then((result) => {
                    resolve("Product Table Successfully Deleted")
                }).catch((err) => {
                    reject(err)
                });
        })
    }
    
    getAll() {
        return new Promise((resolve, reject) => {
            this.Products.findAll({
                order: [["product_id", "ASC"]]
            })
            .then((res) => {
                if (res.length == 0) {
                    resolve({note : "This Table is Empty"})
                } else {
                    resolve(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    getLatest() {
        return new Promise((resolve, reject) => {
            this.Products.findAll({
                order: [["product_id", "DESC"]]
            })
            .then((res) => {
                if (res.length == 0) {
                    resolve({note : "This Table is Empty"})
                } else {
                    resolve(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
    
    search(data) {
        return new Promise((resolve, reject) => {
            this.Products.findAll({
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

    getByPrice(data) {
        return new Promise((resolve, reject) => {
            this.Products.findAll({
                order: [["product_price", `${data}`]]
            })
            .then((res) => {
                if (res.length == 0) {
                    resolve({note : "This Table is Empty"})
                } else {
                    resolve(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
    
    getByName(data) {
        return new Promise((resolve, reject) => {
            this.Products.findAll({
                order: [["product_name", `${data}`]]
            })
            .then((res) => {
                if (res.length == 0) {
                    resolve({note : "This Table is Empty"})
                } else {
                    resolve(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    getByCategory(data) {
        return new Promise((resolve, reject) => {
            this.Products.findAll({
                order: [["product_id", 'DESC']],
                where: {
                    product_category : data
                }
            })
            .then((res) => {
                if (res.length == 0) {
                    resolve({note : "This Table is Empty"})
                } else {
                    resolve(res)
                }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    addData(data, image) {
        return new Promise((resolve, reject) => {
            this.Products.create({
                product_name: data.name,
                product_price: data.price,
                product_image: image,
                product_category: data.category,
            })
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    updateData(data) {
        return new Promise((resolve, reject) => {
            this.Products.update({
                product_name: data.name,
                product_price: data.price,
                product_category: data.category
            }, {
                where: {
                    product_id: data.id
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
            this.Products.destroy({
                where: {
                    product_id: id
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


// products.readProd = () => {
//     return new Promise((resolve, reject) => {
//         db.query(`SELECT * FROM public.products ORDER BY product_id ASC`)
//             .then((res) => {
//                 if (res.rows.length == 0) {
//                     resolve({note : "Data kosong"})
//                 } else {
//                     resolve(res.rows)
//                 }
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

// products.createProd = (data, image) => {
//     return new Promise((resolve, reject) => {
//         db.query(`
//         INSERT INTO public.products(product_name, product_price, product_img) VALUES ('${data.product_name}', ${data.product_price}, '${image}')`)
//         .then((res) => {
//             resolve(res.data)
//         })
//         .catch((err) => {
//             reject(err)
//             console.log(err);
//         })
//     })
// }

// products.updateProd = (data, image) => {
//     console.log(data)
//     return new Promise((resolve, reject) => {
//         db.query(`UPDATE public.products SET product_name='${data.product_name}', product_price=${data.product_price},product_img='${image}' WHERE product_id=${data.product_id}`)
//         .then((res) => {
//             resolve(res.rows)
//         })
//         .catch((err) => {
//             reject(err)
//         })
//     })
// }

// products.deleteProd = (id) => {
//     return new Promise((resolve, reject) => {
//         db.query(`DELETE FROM public.products WHERE product_id=${id}`)
//         .then((res) => {
//             resolve(`data sing id ne ${id} wes ilang`)
//         })
//         .catch((err) => {
//             reject(err)
//         })
//     })
// }

// products.searchProd = (name) => {
//     return new Promise((resolve, reject) => {
//         db.query(`SELECT product_id, product_name, product_price, product_img
//         FROM public.products WHERE product_name LIKE '%${name}%'`)
//             .then((res) => {
//                 if (res.rows.length == 0) {
//                     resolve({note : "Data kosong"})
//                 } else {
//                     resolve(res.rows)
//                 }
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }
// products.orderedProd = (sortby = '', type = '') => {
//     return new Promise((resolve, reject) => {
//         db.query(`SELECT product_name, product_price, product_img FROM public.products ORDER BY '${sortby}' ${type}`)
//             .then((res) => {
//                 if (res.rows.length == 0) {
//                     resolve({note : "Data kosong"})
//                 } else {
//                     resolve(res.rows)
//                 }
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }
module.exports = new Products()
