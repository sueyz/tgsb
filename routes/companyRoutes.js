const express = require('express')
const router = express.Router()
const {registerCompany, getCompanyById, queryCompany, updateCompany, deleteCompany, uploadAvatar, getAllCompany} = require('../controller/companyController')
const {protect} = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        const destination = path.join(__dirname, '../../tgsb-frontend/public/media/companies');

        cb(null, destination)
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.post('/register',protect, registerCompany)
router.get('/query?', protect, queryCompany)
router.get('/?', protect, getAllCompany)
router.get('/:id', protect, getCompanyById)
router.post('/upload', protect, upload.single('avatar'), uploadAvatar)
router.route('/:id').delete(protect, deleteCompany).put(protect, updateCompany)

module.exports = router