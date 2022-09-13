const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const userController = require('../controllers/user')

router.get('/', homeController.getIndex)
router.get('/register', userController.getRegister)
router.post('/register', userController.postRegister)

module.exports = router;