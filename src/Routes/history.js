const express = require('express');
const router = express.Router();
const ctrlHistory = require('../Controllers/history')
const validate = require('../Middleware/validate')

router.get('/commit', ctrlHistory.commit);
router.get('/drop', ctrlHistory.drop);

router.get('/', ctrlHistory.getAll);
router.post('/', ctrlHistory.addData);
router.put('/', ctrlHistory.updateData);
router.delete('/:id', ctrlHistory.deleteData);

module.exports = router