const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, verifyToken, refreshToken, queryUser, getUserById, deleteUser, updateUser} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

// router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify_token', verifyToken)
router.post('/refresh_token', refreshToken)
router.get('/query?', protect, queryUser)
router.get('/:id', protect, getUserById)
router.post('/', protect, registerUser)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)
router.get('/me', protect, getMe)

module.exports = router