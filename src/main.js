/* eslint-disable no-unused-vars */
const express = require("express") //import module / atau file js
const router = express.Router();
const product = require('./Routes/product')
const category =  require('./Routes/category')
const user =  require('./Routes/user')
const auth =  require('./Routes/auth')
const {cloudConfig, uploader} = require('./Configs/cloudinary')


router.use("*", cloudConfig)
router.use("/product", product)
router.use("/category", category)
router.use("/user", user)
router.use("/auth", auth)



module.exports = router