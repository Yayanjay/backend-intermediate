const express = require('express');
const router = express.Router();
const ctrlUser = require('../Controllers/user')
const validate = require('../Middleware/validate')


router.get('/', validate(["admin"]), ctrlUser.getAll);
router.post('/', ctrlUser.addUser);
router.put('/', validate(["admin"]), ctrlUser.updateUser);
router.delete('/:id', validate(["admin"]), ctrlUser.deleteUser);



module.exports = router