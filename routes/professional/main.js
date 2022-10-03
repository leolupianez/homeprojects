const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer");
const {ensureAuth, ensureProfessional, ensureGuest} = require('../../middleware/auth')
const indexController = require('../../controllers/index')
const proAuthController = require('../../controllers/professional/auth')

router.get('/', ensureGuest, indexController.getProIndex)
router.get('/login', ensureGuest, proAuthController.getLogin)
router.post('/login', ensureGuest, proAuthController.postLogin)
router.get('/register', ensureGuest, proAuthController.getRegister)
router.post('/register', upload.single("logo"), proAuthController.postRegister)
router.get('/logout', ensureAuth, ensureProfessional, proAuthController.getLogout)

module.exports = router;