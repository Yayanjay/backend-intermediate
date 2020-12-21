const express = require('express');
const router = express.Router();
const ctrlCat = require('../Controllers/category')

router.get('/', ctrlCat.read);
router.post('/', ctrlCat.create);
router.put('/', ctrlCat.update);
router.delete('/', ctrlCat.delete);

module.exports = router