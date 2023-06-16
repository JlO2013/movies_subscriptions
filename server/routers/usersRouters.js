
const express = require('express');
const router = express.Router();

const authControler = require('../controllers/authController');

router.post('/signup', authControler.signUp);
router.post('/login', authControler.logIn);

module.exports = router;