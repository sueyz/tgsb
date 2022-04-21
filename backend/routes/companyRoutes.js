const express = require('express')
const router = express.Router()
const {registerCompany, getCompany} = require('../controller/companyController')
const { getProject, setProject, updateProject, deleteProject} = require('../controller/projectController')


const {protect} = require('../middleware/authMiddleware')

router.post('/register',protect, registerCompany)
router.get('/:id', protect, getCompany)

//project must have a parent company
router.route('/:id/project').get(protect, getProject).post(protect, setProject)
router.route('/:id/project/:projectId').delete(protect, deleteProject).put(protect, updateProject)

module.exports = router