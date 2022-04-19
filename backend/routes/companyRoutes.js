const express = require('express')
const router = express.Router()
const {registerCompany} = require('../controller/companyController')

router.post('/', registerCompany)

module.exports = router