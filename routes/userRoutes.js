const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, verifyToken, fetchAvatar, refreshToken, queryUser, getUserById, deleteUser, updateUser, uploadAvatar} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        const destination = path.join(__dirname, '../public/media/profile');

        cb(null, destination)
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})
// router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify_token', verifyToken)
router.post('/refresh_token', refreshToken)
router.get('/query?', protect, queryUser)
router.get('/:id', protect, getUserById)
router.post('/', protect, registerUser)
router.get('/fetch/profile/:id', protect, fetchAvatar)
router.post('/upload', protect, upload.single('avatar'), uploadAvatar)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)
router.get('/me', protect, getMe)

module.exports = router