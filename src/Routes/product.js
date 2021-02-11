const express = require('express');
const router = express.Router();
const ctrlProd = require('../Controllers/product')
const validate = require('../Middleware/validate')
const upload = require('../Middleware/multer')
const cache = require('../Middleware/cache')

router.get('/commit', ctrlProd.commit);
router.get('/drop', ctrlProd.drop);

router.get('/', cache, ctrlProd.getAll);
router.get('/item', ctrlProd.getLatest);
router.get('/price', ctrlProd.getByPrice);
router.get('/name', ctrlProd.getByName);
router.get('/category', ctrlProd.getByCategory);
router.get('/search', ctrlProd.getby);
router.post('/', upload.single("image"), ctrlProd.addProduct);
router.put('/', upload.single("image"), ctrlProd.update);
router.delete('/:id', ctrlProd.delete);

// router.get('/', validate(["user", "admin"]), cache  , ctrlProd.getProd);
// router.get('/:name', validate(["user", "admin"]), cache  , ctrlProd.search);
// router.get('/ordered', validate(["user", "admin"]), cache  , ctrlProd.ordered);
// router.post('/', validate(["admin"]), upload.single("product_img"), ctrlProd.addProd);
// router.put('/', validate(["admin"]), upload.single("product_img"), ctrlProd.update);
// router.delete('/:id', validate(["admin"]), ctrlProd.delete);

module.exports = router