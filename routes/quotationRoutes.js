const express = require('express')
const router = express.Router()
const { registerQuotation, getAllUnlockQuotation , queryQuotation, getQuotationById, updateQuotation, deleteQuotation, uploadAttachments,deletePdf, uploadPdf, updateLock, unlockLock, getQuotationByInvoice } = require('../controller/quotationController')
const multer = require('multer')
const path = require('path')
const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = path.join(__dirname, '../public/documents/quotations');

        cb(null, destination)
    },
    filename: (req, file, cb) => {

        // cb(null, Date.now() + path.extname(file.originalname))
        cb(null, `number${Date.now()}_${file.originalname}`)

    }
})

const storagePdf = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = path.join(__dirname, '../public/documents/quotations');

        cb(null, destination)
    },
    filename: (req, file, cb) => {

        // cb(null, Date.now() + path.extname(file.originalname) + '_quote')
        cb(null, `number${Date.now()}`+ '_Quotations_summary.pdf')
    }
})

const upload = multer({ storage: storage })
const upload_pdf = multer({ storage: storagePdf })


router.post('/register', protect, registerQuotation)
router.get('/query?', protect, queryQuotation)
router.get('/current', protect, getAllUnlockQuotation)
router.get('/check/?', protect, getQuotationByInvoice)
router.get('/:id', protect, getQuotationById)
router.route('/:id').delete(protect, deleteQuotation).put(protect, updateQuotation)
router.route('/lock/:id').put(protect, updateLock)
router.route('/unlock/:id').put(protect, unlockLock)
router.route('/pdf/:id').put(protect, deletePdf)
router.post('/upload', protect, upload.array('attachments'), uploadAttachments)
router.post('/pdf', protect, upload_pdf.single('pdf'), uploadPdf)



module.exports = router