const express = require('express');
const router = express.Router();
const ctrlUser = require('../Controllers/user')
const validate = require('../Middleware/validate')

router.get('/commit', validate(["admin"]), ctrlUser.commit);
router.get('/drop', validate(["admin"]), ctrlUser.drop);
router.get('/', validate(["admin"]), ctrlUser.getAll);
router.get('/search', validate(["admin"]), ctrlUser.getBy);
router.post('/', validate(["admin"]), ctrlUser.addUser);
router.put('/', validate(["admin"]), ctrlUser.updateUser);
router.delete('/:id', validate(["admin"]), ctrlUser.deleteUser);
// router.put('/', validate(["admin"]), ctrlUser.updateUser);
// router.delete('/:id', validate(["admin"]), ctrlUser.deleteUser);



module.exports = router