const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const connectController = require('../controllers/connect')

router.post('/request/:id', ensureAuth, connectController.postRequest)
router.delete('/remove/:id', ensureAuth, connectController.removeConnection)

module.exports = router