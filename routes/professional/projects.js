const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const {ensureProfessional, ensureAuth, ensureGuest} = require('../../middleware/auth')
const proProjectsController = require('../../controllers/professional/projects')

router.get('/', ensureAuth, ensureProfessional, proProjectsController.getProjects)

module.exports = router;