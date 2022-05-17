const express = require('express')
const router = express.Router()
const { registerQuotation, queryQuotation, getQuotationById, updateQuotation, deleteQuotation, uploadAttachments, uploadPdf } = require('../controller/quotationController')
const multer = require('multer')
const path = require('path')
const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = path.join(__dirname, '../../frontend/public/documents/quotations');

        cb(null, destination)
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/register', protect, registerQuotation)
router.get('/query?', protect, queryQuotation)
router.get('/:id', protect, getQuotationById)
router.route('/:id').delete(protect, deleteQuotation).put(protect, updateQuotation)
router.post('/upload', protect, upload.array('attachments'), uploadAttachments)
router.post('/pdf', protect, upload.single('pdf'), uploadPdf)



module.exports = router