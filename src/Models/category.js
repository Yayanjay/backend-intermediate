/* eslint-disable no-unused-vars */
const db = require('../Configs/db')
const categories = {}

categories.readCat = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.categories ORDER BY id ASC`)
            .then((res) => {
                if (res.rows.length == 0) {
                    resolve({msg : "Data kosong"})
                } else {
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

categories.createCat = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.categories(category) VALUES ('${data.category}')`)
        .then((res) => {
            resolve(data)
        })
        .catch((err) => {
            // reject(err)
            console.log(err)
        })
    })
}

categories.updateCat = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.categories SET category='${data.category}' WHERE id=${data.id}`)
            .then((res) => {
                resolve(data)
            })
            .catch((err) => {
                // reject(err)
                console.log(err)
            })
    })
}

categories.deleteCat = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.categories WHERE id=${data.id}`)
            .then((res) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = categories