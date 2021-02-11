/* eslint-disable no-unused-vars */
const express = require("express") //import module / atau file js
const router = express.Router();
const product = require('./Routes/product')
const user =  require('./Routes/user')
const auth =  require('./Routes/auth')
const history =  require('./Routes/history')
const {cloudConfig, uploader} = require('./Configs/cloudinary')


router.use("*", cloudConfig)
router.use("/api/product", product)
router.use("/api/user", user)
router.use("/api/auth", auth)
router.use("/api/history", history)



module.exports = router