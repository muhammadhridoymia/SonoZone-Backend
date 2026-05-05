const { Router } = require('express');
const { register } = require('../User/Registration');
const { login } = require('../User/Login');
const { verifyUser } = require('../User/VerifyUser');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyUser);

module.exports = router;