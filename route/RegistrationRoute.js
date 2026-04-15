const { Router } = require('express');
const { register } = require('../User/Registration');

const router = Router();

router.post('/register', register);

module.exports = router;