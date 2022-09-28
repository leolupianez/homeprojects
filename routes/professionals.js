const express = require('express')
const router = express.Router()
const {ensureAuth, ensureProfessional, ensureGuest} = require('../middleware/auth')
const professionalsController = require('../controllers/professionals')

router.get('/', ensureProfessional, professionalsController.getIndex)
router.get('/login', ensureGuest, professionalsController.getLogin)
router.post('/login', ensureGuest, professionalsController.postLogin)
router.get('/register', ensureGuest, professionalsController.getRegister)
router.post('/register', ensureGuest, professionalsController.postRegister)
router.get('/logout', ensureAuth, ensureProfessional, professionalsController.getLogout)

module.exports = router;