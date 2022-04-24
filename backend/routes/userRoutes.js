const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, verifyToken, refreshToken, queryAllUser, getUser, deleteUser, updateUser} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify_token', verifyToken)
router.post('/refresh_token', refreshToken)
router.get('/query', protect, queryAllUser)
router.get('/:id', protect, getUser)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)
router.get('/me', protect, getMe)

module.exports = router