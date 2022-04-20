const express = require('express')
const router = express.Router()
const {registerCompany, getCompany} = require('../controller/companyController')

const {protect} = require('../middleware/authMiddleware')

router.post('/register',protect, registerCompany)
router.get('/:id', protect, getCompany)

module.exports = router