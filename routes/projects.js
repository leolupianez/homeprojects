const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer")
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const projectsController = require('../controllers/projects')

router.get('/', ensureAuth, projectsController.getIndex)
router.get('/add', ensureAuth, projectsController.getAdd)
router.post('/add', ensureAuth, upload.array('photos', 10), projectsController.postAdd)

module.exports = router;