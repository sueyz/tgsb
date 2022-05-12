const express = require('express')
const router = express.Router()
const {getTransactions, registerExpenses} = require('../controller/expensesController')
const {protect} = require('../middleware/authMiddleware')

// router.post('/register',protect, registerCompany)
router.route('/transactions').get(protect, getTransactions).post(protect, registerExpenses)
// router.get('/:id', protect, getCompanyById)
// router.route('/:id').delete(protect, deleteCompany).put(protect, updateCompany)

module.exports = router