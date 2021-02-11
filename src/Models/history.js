const db = require('../Configs/db')
const sequelize =  require('sequelize')
const { INTEGER, where } = require('sequelize')
const { resolve } = require('app-root-path')

class Histories {
    constructor() {
        this.Histories = db.sequelize.define("histories", {
            history_id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            invoices: {
                type: sequelize.STRING,
                allowNull: false
            },
            cashier: {
                type: sequelize.STRING,
                allowNull: false
            },
            orders: {
                type: sequelize.TEXT,
                allowNull: false
            },
            amount: {
                type: sequelize.BIGINT,
                allowNull: false
            }

        })
    }

    commit() {
        return new Promise((resolve, reject) => {
            this.Histories.sync()
            .then(() => {
                resolve("Successfully Created History Table")
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    drop() {
        return new Promise((resolve, reject) => {
            this.Histories.drop()
            .then(() => {
                resolve("Successfully Deleted History Table")
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.Histories.findAll()
            .then((res) => {
                if (res.length == 0) {
                    resolve("History Table is Empty")
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
            this.Histories.create({
                invoices: data.invoices,
                cashier: data.cashier,
                orders: data.orders,
                amount: data.amount,
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
            this.Histories.update({
                invoices: data.invoices,
                cashier: data.cashier,
                orders: data.orders,
                amount: data.amount,
            }, {
                where: {
                    history_id: data.id
                }
            })
            .then((res) => {
                resolve("Data Successfully Updated")
            }).catch((err) => {
                reject(err)
            });
        })
    }

    deleteData(id) {
        return new Promise((resolve, reject) => {
            this.Histories.destroy({
                where: {
                    history_id: id
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

module.exports = new Histories()