const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const {ensureAuth, ensureProfessional} = require('../../middleware/auth')
const profileController = require('../../controllers/professional/profile')

router.get('/', ensureAuth, ensureProfessional, profileController.getProProfile)
router.get('/edit', ensureAuth, ensureProfessional, profileController.getProEditProfile)
router.post('/edit', ensureAuth, ensureProfessional, upload.single("logo"), profileController.postProEditProfile)

module.exports = router;