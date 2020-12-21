/* eslint-disable no-unused-vars */
const db = require('../Configs/db')
const products = {}

products.readProd = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.products ORDER BY product_id ASC`)
            .then((res) => {
                if (res.rows.length == 0) {
                    resolve({note : "Data kosong"})
                } else {
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

products.createProd = (data, image) => {
    return new Promise((resolve, reject) => {
        db.query(`
        INSERT INTO public.products(product_name, product_price, product_img) VALUES ('${data.product_name}', ${data.product_price}, '${image}')`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
            console.log(err);
        })
    })
}

products.updateProd = (data, image) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.products SET product_name='${data.product_name}', product_price=${data.product_price},product_img='${image}' WHERE product_id=${data.product_id}`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

products.deleteProd = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.products WHERE product_id=${id}`)
        .then((res) => {
            resolve(`data sing id ne ${id} wes ilang`)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

products.searchProd = (name) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT product_id, product_name, product_price, product_img
        FROM public.products WHERE product_name LIKE '%${name}%'`)
            .then((res) => {
                if (res.rows.length == 0) {
                    resolve({note : "Data kosong"})
                } else {
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
products.orderedProd = (sortby = '', type = '') => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT product_name, product_price, product_img FROM public.products ORDER BY '${sortby}' ${type}`)
            .then((res) => {
                if (res.rows.length == 0) {
                    resolve({note : "Data kosong"})
                } else {
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
module.exports = products
