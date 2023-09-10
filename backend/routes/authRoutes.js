// import user controller to use its methods
const { signUp, login, getAllusers, gLogin } = require('../controllers/authController');

const express = require('express');

const router = express.Router();


// handle POST rquest at "/signup" uri
router.post('/signup', signUp);

// handle POST rquest at "/login" uri
router.post('/login', login);

//handle GET rquest at "/signup" uri
router.get('/signup', getAllusers);

//handle POST rquest at "/glogin" uri
router.post('/glogin', gLogin);

module.exports = router;