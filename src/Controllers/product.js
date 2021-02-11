// const products = {}
const model = require('../Models/product')
const respons = require('../Helpers/respons')
const cloudUpload = require('../Helpers/cloudUpload')
const {redisdb} = require('../Configs/redis')


class Products {
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
            const saveToRedis = JSON.stringify(result)
            redisdb.setex("product", 300, saveToRedis)
            console.log("from Postgresql")
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async getLatest(req, res) {
        try {
            const result = await model.getLatest();
            return respon(res, 200, result);
        } catch (error) {
            return respon(res, 500, error);
        }
    }
    
    async getby(req, res) {
        try {
            const {name, price, category} = req.query
            const data = {}
            let result = ""

            if (name) {
                data.product_name = name
            }
            if (price) {
                data.product_price = price
            }
            if (category) {
                data.product_category = category
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

    async getByPrice(req, res) {
        try {
            const result = await model.getByPrice(req.query.price)
            return respons(res, 200, result);
        } catch (error) {
            console.log(error)
            return respons(res, 500, error);
        }
    }
    
    async getByName(req, res) {
        try {
            const result = await model.getByName(req.query.name)
            return respons(res, 200, result);
        } catch (error) {
            console.log(error)
            return respons(res, 500, error);
        }
    }
    
    async getByCategory(req, res) {
        try {
            const result = await model.getByCategory(req.query.category)
            return respons(res, 200, result);
        } catch (error) {
            console.log(error)
            return respons(res, 500, error);
        }
    }

    async addProduct(req, res) {
        try {
            if(req.file === undefined) {
                return respons(res, 500, { msg: "image harus diisi"})
            }
            const image_url = await cloudUpload(req.file.path)
            const result = await model.addData(req.body, image_url)
            // redisdb.del("product")
    
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }
    
    async update(req,res) {
        try {
            if(req.file === undefined) {
                return respons(res, 500, { msg: "image harus diisi"})
            }
            const image_url = await cloudUpload(req.file.path)
            const hasil = await model.updateData(req.body, image_url)
            redisdb.del("product")
            return respons(res, 200, hasil)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
        }
    }

    async delete(req,res) {
        try {
            const result = await model.deleteData(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 400, error)
        }
    }
}


// products.getProd = async (req,res) => {
//     try {
//         const result = await model.readProd()
//         const saveToRedis = JSON.stringify(result)

//         redisdb.setex("product", 300, saveToRedis)
//         console.log("from Postgresql")
//         return respons(res, 200, result)
//     } catch (error) {
//         return respons(res, 400, error)
//     }
// }

// products.addProd = async (req,res) => {
//     try {
//         if(req.file === undefined) {
//             return respons(res, 500, { msg: "image harus diisi"})
//         }
//         const image_url = await cloudUpload(req.file.path)
//         const result = await model.createProd(req.body, image_url)
//         redisdb.del("product")

//         return respons(res, 200, result)
//     } catch (error) {
//         console.log(error);
//         return respons(res, 400, error)
//     }
// }

// products.update = async (req,res) => {
//     try {
//         if(req.file === undefined) {
//             return respons(res, 500, { msg: "image harus diisi"})
//         }
//         const image_url = await cloudUpload(req.file.path)
//         const hasil = await model.updateProd(req.body, image_url)
//         redisdb.del("product")
//         return respons(res, 200, hasil)
//     } catch (error) {
//         console.log(error)
//         return respons(res, 400, error)
//     }
// }
// products.delete = async (req,res) => {
//     try {
//         const result = await model.deleteProd(req.params.id)
//         return respons(res, 200, result)
//     } catch (error) {
//         return respons(res, 400, error)
//     }
// }
// products.search = async (req,res) => {
//     try {
//         const result = await model.searchProd(req.params.name)
//         return respons(res, 200, result)
//     } catch (error) {
//         return respons(res, 400, error)
//     }
// }
// products.ordered = async (req,res) => {
//     try {
//         const result = await model.orderedProd(req.query.sortBy, req.query.type)
//         return respons(res, 200, result)
//     } catch (error) {
//         return respons(res, 400, error)
//     }
// }

module.exports = new Products()

