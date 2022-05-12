const express = require('express')
const router = express.Router()
const {getTransactions} = require('../controller/expensesController')
const {protect} = require('../middleware/authMiddleware')

// router.post('/register',protect, registerCompany)
router.get('/transactions', protect, getTransactions)
// router.get('/:id', protect, getCompanyById)
// router.route('/:id').delete(protect, deleteCompany).put(protect, updateCompany)

module.exports = router