const express = require('express');
const router = express.Router();
const ctrlProd = require('../Controllers/product')
const validate = require('../Middleware/validate')
const upload = require('../Middleware/multer')
const cache = require('../Middleware/cache')

router.get('/', validate(["user", "admin"]), cache  , ctrlProd.getProd);
router.get('/:name', validate(["user", "admin"]), cache  , ctrlProd.search);
router.get('/ordered', validate(["user", "admin"]), cache  , ctrlProd.ordered);
router.post('/', validate(["admin"]), upload.single("product_img"), ctrlProd.addProd);
router.put('/', validate(["admin"]), upload.single("product_img"), ctrlProd.update);
router.delete('/:id', validate(["admin"]), ctrlProd.delete);

module.exports = router