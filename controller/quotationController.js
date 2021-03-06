const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')
const path = require('path');
const fs = require('fs')

const Quotation = require('../model/quotationModel')
const ObjectId = require('mongoose').Types.ObjectId

// @ desc Register Company
// @rout Post /api/registerCompany
// @access Public

const getAllUnlockQuotation= asyncHandler (async (req, res) => {

    const quotation = await Quotation.find({lock: false})

    res.status(200).json({
        data: quotation
    })
})

const registerQuotation = asyncHandler(async (req, res) => {
    const { company, companyName, sub_cons, name, invoiceNo, address1, address2, address3, zip, city, state, email, quotations, balancePaid,
        payment_term, projectSchedule, note, poc, contact, attachments, workType, lock } = req.body


    if (!company || !companyName || !name || !address1 || !invoiceNo || !quotations || !zip || !city || !state) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    //Check if Project exist
    const quotationExists = await Quotation.findOne({ invoiceNo })

    if (quotationExists) {
        res.status(400)

        throw new Error('{Quotation already exists!')
    }

    //Create Quotation
    const quotation = await Quotation.create({
        company,
        companyName,
        sub_cons,
        name,
        invoiceNo,
        address1,
        address2,
        address3,
        zip,
        city,
        state,
        email,
        quotations,
        balancePaid,
        payment_term,
        projectSchedule,
        note,
        poc,
        contact,
        workType,
        attachments,
        lock
    })

    if (quotation) {
        res.status(201).json({
            _id: quotation.id,
            company: quotation.company,
            companyName: quotation.companyName,
            sub_cons: quotation.sub_cons,
            name: quotation.name,
            invoiceNo: quotation.invoiceNo,
            address1: quotation.address1,
            address2: quotation.address2,
            address3: quotation.address3,
            zip: quotation.zip,
            city: quotation.city,
            state: quotation.state,
            email: quotation.email,
            quotations: quotation.quotations,
            balancePaid: quotation.balancePaid,
            payment_term: quotation.payment_term,
            projectSchedule: quotation.projectSchedule,
            note: quotation.note,
            poc: quotation.poc,
            contact: quotation.contact,
            workType: quotation.workType,
            attachments: quotation.attachments,
            lock: quotation.lock
        })
    } else {
        res.status(400)
        throw new Error('Invalid quotation data')
    }
})

const uploadAttachments = (req, res) => {

    if (!req.files) {
        res.status(400)
        throw new Error('Please choose an item')
    }

    res.status(200).json({
        files: req.files
    })
}

const fetchAttachment =(req, res) => {

    let file = req.params.id;

    let fileLocation = path.join(__dirname, '../public/documents/quotations', file);
    res.sendFile(`${fileLocation}`)
}

const uploadPdf = (req, res) => {

    if (!req.file) {
        res.status(400)
        throw new Error('Please choose an item')
    }

    res.status(200).json({
        files: req.file.filename
    })
}

// @desc get Projec 
// @rout GEt /api/user/query
// @access Private
const queryQuotation = asyncHandler(async (req, res) => {

    var userQuery = req.query.search;
    var searchString = new RegExp(userQuery, 'ig');

    const page = parseInt(req.query.page)
    var filter = req.query.filter_type
    var filter2 = req.query.filter_worktype
    var filter3 = (req.query.filter_lock === "true")

    var queryMatch = {}

    const sort = req.query.sort
    const order = req.query.order

    if (filter === undefined && filter2 === undefined && req.query.filter_lock === undefined) {
        filter = null
        filter2 = null
        filter3 = null
        queryMatch = { name: searchString }
    } else if (filter === undefined && req.query.filter_lock === undefined && filter2 !== undefined && req.query.filter_lock === undefined) {
        filter = null
        filter3 = null
        filter2 = filter2.toUpperCase()

        queryMatch = { name: searchString, workType: filter2 }
    } else if (filter !== undefined && filter2 === undefined && req.query.filter_lock === undefined) {
        filter2 = null
        filter3 = null
        filter = filter.charAt(0).toUpperCase() + filter.slice(1)

        queryMatch = { name: searchString, type: filter }
    } else if (filter === undefined && filter2 === undefined && req.query.filter_lock !== undefined) {
        filter2 = null
        filter = null

        queryMatch = { name: searchString, lock: filter3 }
    }
    else if (filter !== undefined && filter2 !== undefined && req.query.filter_lock === undefined) {
        filter3 = null

        queryMatch = { name: searchString, type: filter, workType: filter2 }
    }
    else if (filter === undefined && filter2 !== undefined && req.query.filter_lock !== undefined) {
        filter = null

        queryMatch = { name: searchString, type: filter, lock: filter3 }
    }
    else if (filter !== undefined && filter2 === undefined && req.query.filter_lock !== undefined) {
        filter2 = null

        queryMatch = { name: searchString, workType: filter2, lock: filter3 }
    }
    else {
        filter = filter.charAt(0).toUpperCase() + filter.slice(1)
        filter2 = filter2.toUpperCase()

        queryMatch = { name: searchString, type: filter, workType: filter2, lock: filter3 }
    }

    const limit = 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const link = []


    Quotation.aggregate()
        .sort({ [sort]: order })
        .project({
            id: '$_id',
            sub_cons: 1,
            company: 1,
            companyName: 1,
            name: 1,
            invoiceNo: 1,
            address1: 1,
            address2: 1,
            address3: 1,
            zip: 1,
            city: 1,
            state: 1,
            email: 1,
            quotations: 1,
            balancePaid: 1,
            payment_term: 1,
            projectSchedule: 1,
            note: 1,
            poc: 1,
            contact: 1,
            isFinished: 1,
            attachments: 1,
            workType: 1,
            lock: 1
        })
        .collation({ locale: "en" })
        .match(queryMatch)
        .match({company: ObjectId(req.params.id)})
        .skip(startIndex)
        .limit(limit)
        .exec(function (err, quotation) {
            if (err) throw err;

            Quotation.aggregate()
                .project({
                    name: 1, workType: 1, lock: 1
                }) //for filter + search
                .match(queryMatch)
                .count('finalCount')
                .exec((count_error, valueCount) => {

                    var count = 0

                    if (valueCount.length >= 1) {
                        count = valueCount[0].finalCount
                    }

                    const lastPage = Math.ceil(count / limit)
                    const fromValue = (limit * page) - (limit - 1)
                    const toValue = page === lastPage ? count : (limit * page)

                    if (err) {
                        return res.json(count_error);
                    }

                    if (startIndex > 0) {
                        link.push({
                            url: `/?page=${page - 1}`,
                            label: "&laquo; Previous",
                            active: false,
                            page: page - 1
                        })
                    }

                    var startPage, endPage;
                    if (lastPage <= 10) {
                        // less than 10 total pages so show all
                        startPage = 1;
                        endPage = lastPage;
                    } else {
                        // more than 10 total pages so calculate start and end pages
                        if (page <= 6) {
                            startPage = 1;
                            endPage = 10;
                        } else if (page + 4 >= lastPage) {
                            startPage = lastPage - 9;
                            endPage = lastPage;
                        } else {
                            startPage = page - 5;
                            endPage = page + 4;
                        }
                    }

                    for (let index = startPage; index <= endPage; index++) {
                        link.push({
                            url: `/?page=${index}`,
                            label: `${index}`,
                            active: true,
                            page: index
                        })
                    }


                    if (endIndex < count) {
                        link.push({
                            url: `/?page=${page + 1}`,
                            label: "Next &raquo;",
                            active: false,
                            page: page + 1
                        })
                    }

                    res.status(200).json({
                        data: quotation,
                        payload: {
                            pagination: {
                                page: page,
                                items_per_page: limit,
                                first_page_url: '/?page=1',
                                from: fromValue,
                                last_page: lastPage,
                                links: link,
                                next_page_url: page + 1 > lastPage ? null : `/?page=${page + 1}`,
                                items_per_page: limit,
                                prev_page_url: page - 1 === 0 ? null : ` /?page=${page - 1}`,
                                to: toValue,
                                total: count
                            }
                        }
                    })
                });
        });
})

// @ desc Get something
// @rout GET api/company/:id/project
const getQuotationById = asyncHandler(async (req, res) => {

    const quotations = await Quotation.findById(req.params.id)

    res.status(200).json({
        data: quotations
    })
})

const getQuotationByInvoice = asyncHandler(async (req, res) => {

    const quotationExists = await Quotation.findOne({ invoiceNo: Object.keys(req.query) })

    res.status(200).json({
        data: quotationExists
    })
})

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateQuotation = asyncHandler(async (req, res) => {

    const quotation = await Quotation.findById(req.params.id)

    if (!quotation) {
        res.status(400)
        throw new Error('Quotation not found')
    }


    var summary = req.body.attachments.filter(element => element.includes('Quotations_summary'))

    if (summary.length > 1) {

        var newNumbers = []
        Array.from(summary).forEach((element) => {

            parseInt(newNumbers.push(element.substring(element.indexOf("r") + 1, element.indexOf("_"))))
        })

        var findToDelete = Math.min(...newNumbers)

        var newSummaryArray = req.body.attachments.filter(element => !element.includes(findToDelete))

        var oldPdf = req.body.attachments.find(element => element.includes(findToDelete))

        if (oldPdf !== undefined) {
            console.log(__dirname)

            try {
                const oldPath = path.join(__dirname, '../public/documents/', oldPdf);

                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }

        var submit = req.body
        submit.attachments = newSummaryArray

        const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, submit, { new: true })
        res.status(200).json({
            data: updatedQuotation
        })
    } else {
        const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            data: updatedQuotation
        })

    }
})

const deletePdf = asyncHandler(async (req, res) => {

    const quotation = await Quotation.findById(req.params.id)

    if (!quotation) {
        res.status(400)
        throw new Error('Quotation not found')
    }

    const oldPdfPaths = req.body.attachments
    const oldPdf = req.body.path
    var newPdfPaths = oldPdfPaths.filter(f => f !== oldPdf)

    //  Remove old photo
    if (oldPdf !== undefined) {
        console.log(__dirname)

        try {
            const oldPath = path.join(__dirname, '../public/documents/', oldPdf);

            if (fs.existsSync(oldPath)) {
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, { "attachments": newPdfPaths }, { new: true })
    res.status(200).json({
        data: updatedQuotation
    })

})

const updateLock = asyncHandler(async (req, res) => {

    const quotation = await Quotation.findById(req.params.id)

    if (!quotation) {
        res.status(400)
        throw new Error('Quotation not found')
    }

    const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, { "lock": true }, { new: true })
    res.status(200).json(updatedQuotation)
})

const unlockLock = asyncHandler(async (req, res) => {

    const quotation = await Quotation.findById(req.params.id)

    if (!quotation) {
        res.status(400)
        throw new Error('Quotation not found')
    }

    const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, { "lock": false }, { new: true })
    res.status(200).json(updatedQuotation)
})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteQuotation = asyncHandler(async (req, res) => {
    const quotation = await Quotation.findById(req.params.id)

    if (!quotation) {
        res.status(400)
        throw new Error('Quotation not found')
    }

    Array.from(quotation.attachments).forEach(old => {
        if (old !== undefined) {
            console.log(__dirname)

            try {
                const oldPath = path.join(__dirname, '../public/documents/', old);

                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }
    });

    const deletedQuotation = await Quotation.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedQuotation)
})

module.exports = {
    getAllUnlockQuotation,
    registerQuotation,
    queryQuotation,
    getQuotationById,
    updateQuotation,
    deleteQuotation,
    uploadAttachments,
    uploadPdf,
    deletePdf,
    updateLock,
    unlockLock,
    getQuotationByInvoice,
    fetchAttachment
}