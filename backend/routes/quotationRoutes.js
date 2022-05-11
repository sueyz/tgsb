const express = require('express')
const router = express.Router()
const { registerQuotation, queryQuotation, getQuotationById, updateQuotation, deleteQuotation } = require('../controller/quotationController')

const { protect } = require('../middleware/authMiddleware')

router.post('/register',protect, registerQuotation)
router.get('/query?', protect, queryQuotation)
router.get('/:id', protect, getQuotationById)
router.route('/:id').delete(protect, deleteQuotation).put(protect, updateQuotation)


module.exports = router