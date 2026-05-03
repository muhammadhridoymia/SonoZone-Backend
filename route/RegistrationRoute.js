const { Router } = require('express');
const { register } = require('../User/Registration');
const { login } = require('../User/Login');

const router = Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;