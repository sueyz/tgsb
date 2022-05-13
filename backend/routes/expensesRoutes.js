const express = require('express')
const router = express.Router()
const {getTransactions, registerExpenses, deleteTransactionn} = require('../controller/expensesController')
const {protect} = require('../middleware/authMiddleware')

// router.post('/register',protect, registerCompany)
router.route('/transactions').get(protect, getTransactions).post(protect, registerExpenses)
// router.get('/:id', protect, getCompanyById)
router.route('/transactions/:id').delete(protect, deleteTransactionn)
// .put(protect, updateCompany)

module.exports = router