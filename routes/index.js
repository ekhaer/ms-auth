const router = require('express').Router();
const login = require('./loginRoute');
const LoginController = require('../controllers/loginController')


router.post('/login', LoginController.login)
router.post('/refresh-token', LoginController.refreshToken)
router.post('/logout', LoginController.logout)

router.post('/verify', LoginController.verify)


module.exports = router;