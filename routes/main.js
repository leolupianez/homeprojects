const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const homeController = require('../controllers/home')
const userController = require('../controllers/user')

router.get('/', homeController.getIndex)
router.get('/login', ensureGuest, userController.getLogin)
router.post('/login', ensureGuest, userController.postLogin)
router.get('/register', ensureGuest, userController.getRegister)
router.post('/register', ensureGuest, userController.postRegister)
router.get('/logout', ensureAuth, userController.getLogout)

module.exports = router;