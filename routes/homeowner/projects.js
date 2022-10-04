const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const {ensureHomeowner, ensureAuth} = require('../../middleware/auth')
const projectsController = require('../../controllers/homeowner/projects')

router.get('/', ensureAuth, ensureHomeowner, projectsController.getProjects)
router.get('/add', ensureAuth, ensureHomeowner, projectsController.getAdd)
router.post('/add', ensureAuth, ensureHomeowner, upload.array('photos', 10), projectsController.postAdd)
router.delete('/removeProject/:id', ensureAuth, ensureHomeowner, projectsController.removeProject)
router.get('/:id', ensureAuth, ensureHomeowner, projectsController.getProject)

module.exports = router;