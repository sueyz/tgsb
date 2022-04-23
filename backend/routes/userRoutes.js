const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, verifyToken, refreshToken} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify_token', verifyToken)
router.post('/refresh_token', refreshToken)
router.get('/me', protect, getMe)

module.exports = router