const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const {ensureProfessional, ensureAuth, ensureGuest} = require('../../middleware/auth')
const proProjectsController = require('../../controllers/professional/projects')

router.get('/', ensureAuth, ensureProfessional, proProjectsController.getProjects)
router.get('/all', ensureAuth, ensureProfessional, proProjectsController.getAllProjects)
router.post('/addZip', ensureAuth, ensureProfessional, proProjectsController.addZip)
router.delete('/removeZip', ensureAuth, ensureProfessional, proProjectsController.removeZip)
router.post('/addComment/:id', ensureAuth, ensureProfessional, proProjectsController.addComment)
router.delete('/removeComment/:id', ensureAuth, ensureProfessional, proProjectsController.removeComment)
router.get('/:id', ensureAuth, ensureProfessional, proProjectsController.getProject)

module.exports = router;