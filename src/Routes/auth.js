const express = require('express');
const router = express.Router();
const ctrlAuth = require('../Controllers/auth')

router.post('/', ctrlAuth.login);


module.exports = router