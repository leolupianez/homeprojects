const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const {ensureAuth, ensureHomeowner} = require('../../middleware/auth')
const profileController = require('../../controllers/homeowner/profile')

router.get('/', ensureAuth, ensureHomeowner, profileController.getUserProfile)
router.get('/edit', ensureAuth, ensureHomeowner, profileController.getEditProfile)
router.post('/edit', ensureAuth, ensureHomeowner, profileController.postEditProfile)

module.exports = router;