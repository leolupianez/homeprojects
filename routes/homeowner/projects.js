const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const {ensureHomeowner, ensureAuth} = require('../../middleware/auth')
const projectsController = require('../../controllers/homeowner/projects')

router.get('/', ensureAuth, ensureHomeowner, projectsController.getProjects)
router.get('/add', ensureAuth, ensureHomeowner, projectsController.getAdd)
router.post('/add', ensureAuth, ensureHomeowner, upload.array('photos', 10), projectsController.postAdd)
router.delete('/delete/:id', ensureAuth, ensureHomeowner, projectsController.removeProject)
router.get('/edit/:id', ensureAuth, ensureHomeowner, projectsController.editProject)
router.put('/edit/:id', ensureAuth, ensureHomeowner, upload.array('photos', 10), projectsController.updateProject)
router.get('/:id', ensureAuth, ensureHomeowner, projectsController.getProject)

module.exports = router;