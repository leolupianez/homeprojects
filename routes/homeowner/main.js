const express = require('express')
const router = express.Router()
const {ensureGuest, ensureHomeowner, ensureAuth} = require('../../middleware/auth')
const indexController = require('../../controllers/index')
const homeownerController = require('../../controllers/homeowner/auth')

router.get('/', ensureHomeowner, indexController.getIndex)
router.get('/login', ensureGuest, homeownerController.getLogin)
router.post('/login', ensureGuest, homeownerController.postLogin)
router.get('/register', ensureGuest, homeownerController.getRegister)
router.post('/register', ensureGuest, homeownerController.postRegister)
router.get('/logout', ensureAuth, homeownerController.getLogout)

module.exports = router;