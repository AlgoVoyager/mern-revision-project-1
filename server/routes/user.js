const express = require('express')
const router = express.Router();
const { signup, login, getUserById } = require('../controllers/user');
const authentication = require('../middlewares/authentication');

router.post('/signup', signup);
router.post('/login', login); 
router.get('/', authentication, getUserById);

module.exports = router;