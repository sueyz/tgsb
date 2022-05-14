const express = require('express')
const router = express.Router()
const {getTransactions, registerExpenses, deleteTransaction, updateTransaction} = require('../controller/expensesController')
const {protect} = require('../middleware/authMiddleware')

// router.post('/register',protect, registerCompany)
router.route('/transactions').get(protect, getTransactions).post(protect, registerExpenses)
// router.get('/:id', protect, getCompanyById)
router.route('/transactions/:id').delete(protect, deleteTransaction).put(protect, updateTransaction)


module.exports = router