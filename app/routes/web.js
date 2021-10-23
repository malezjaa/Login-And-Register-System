const express = require('express')
const router = express.Router()
const PageController = require('../controllers/page-controller')
const UserController = require('../controllers/user-controller')

router.get('/', PageController.showMainPage)

//authentication
//=register
router.get('/register', UserController.showRegister)
router.post('/register', UserController.register)

//=login
router.get('/login', UserController.showLogin)
router.post('/login', UserController.login)

//=logout
router.get('/logout', UserController.logout)

module.exports = router
