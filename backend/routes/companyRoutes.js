const express = require('express')
const router = express.Router()
const {registerCompany, getCompanyById, queryCompany, updateCompany, deleteCompany, uploadAvatar} = require('../controller/companyController')
const { getProject, setProject, updateProject, deleteProject} = require('../controller/projectController')
const {protect} = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        const destination = path.join(__dirname, '../../frontend/public/media/companies');

        cb(null, destination)
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.post('/register',protect, registerCompany)
router.get('/query?', protect, queryCompany)
router.get('/:id', protect, getCompanyById)
router.post('/upload', protect, upload.single('avatar'), uploadAvatar)
router.route('/:id').delete(protect, deleteCompany).put(protect, updateCompany)

//project must have a parent company
router.route('/:id/project').get(protect, getProject).post(protect, setProject)
router.route('/:id/project/:projectId').delete(protect, deleteProject).put(protect, updateProject)

module.exports = router