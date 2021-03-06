const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Expenses = require('../model/expensesModel')

// @ desc Register Company
// @rout Post /api/registerCompany
// @access Public
const registerExpenses = asyncHandler( async (req, res) => {
    const {category, type, bank, card_type, title, amount, note, isDebt, lent_upfronted} = req.body

    if(!category || !type|| !bank|| !card_type || !title || !amount){
        res.status(400)
        throw new Error('Please add all required fields')
    }

    //Create expenses
    const expenses = await Expenses.create({
        category,
        type,
        bank,
        card_type,
        title,
        amount,
        note,
        isDebt,
        lent_upfronted,
        // refund,
        // claim_date
    })

    if(expenses){
        res.status(201).json({
            transaction: expenses
        })
    } else{
        res.status(400)
        throw new Error('Invalid expenses data')
    }
})

// @desc get Projec 
// @rout GEt /api/user/query
// @access Private
// const queryQuotation = asyncHandler( async (req, res) => {

//     var userQuery = req.query.search; 
//     var searchString = new RegExp(userQuery, 'ig');

//     const page = parseInt(req.query.page)
//     var filter = req.query.filter_type
//     var filter2 = req.query.filter_worktype
//     var queryMatch = {}

//     const sort = req.query.sort
//     const order = req.query.order

//     if(filter === undefined && filter2 === undefined){
//         filter = null
//         filter2 = null
//         queryMatch = { name: searchString}
//     } else if(filter === undefined && filter2 !== undefined){
//         filter = null
//         filter2 = filter2.toUpperCase()

//         queryMatch = { name: searchString, workType: filter2}
//     } else if(filter !== undefined && filter2 === undefined){
//         filter2 = null
//         filter = filter.charAt(0).toUpperCase() + filter.slice(1)

//         queryMatch = { name: searchString, type: filter}
//     }
//     else{
//         filter = filter.charAt(0).toUpperCase() + filter.slice(1)
//         filter2 = filter2.toUpperCase()

//         queryMatch = { name: searchString, type: filter, workType: filter2}
//     }

//     const limit = 10

//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     const link = []

        
//     Quotation.aggregate()
//     .sort({ [sort]: order } )
//     .project({
//         id: '$_id',
//         type: 1,
//         name: 1,
//         invoiceNo: 1,
//         address: 1,
//         quotations: 1,
//         balancePaid: 1,
//         next_payment_date: 1,
//         finalPaymentDate: 1,
//         payment_term: 1,
//         projectSchedule: 1,
//         note: 1,
//         poc: 1,
//         contact: 1,
//         isFinished: 1,
//         workType: 1
//     })
//     .collation({locale: "en" })
//     .match(queryMatch)
//     .skip(startIndex) 
//     .limit(limit)
//     .exec(function (err, companies) {
//         if (err) throw err;

//         Quotation.aggregate()
//         .project({name: 1, type: 1, workType: 1}) //for filter + search
//         .match(queryMatch)
//         .count('finalCount')
//         .exec((count_error, valueCount) => {

//             var count = 0

//             if(valueCount.length >= 1){
//                 count = valueCount[0].finalCount
//             }

//             const lastPage = Math.ceil(count / limit)
//             const fromValue = (limit * page) - (limit -1)
//             const toValue = page === lastPage ? count : (limit * page)

//             if (err) {
//                 return res.json(count_error);
//             }

//             if (startIndex > 0) {
//                 link.push({
//                     url: `/?page=${page - 1}`,
//                     label: "&laquo; Previous",
//                     active: false,
//                     page: page - 1
//                 })
//             }

//             var startPage, endPage;
//             if (lastPage <= 10) {
//             // less than 10 total pages so show all
//                 startPage = 1;
//                 endPage = lastPage;
//             } else {
//             // more than 10 total pages so calculate start and end pages
//                 if (page <= 6) {
//                     startPage = 1;
//                     endPage = 10;
//                 } else if (page + 4 >= lastPage) {
//                     startPage = lastPage - 9;
//                     endPage = lastPage;
//                 } else {
//                     startPage = page - 5;
//                     endPage = page + 4;
//                 }
//             }

//             for (let index = startPage; index <= endPage; index++) {
//                     link.push({
//                         url: `/?page=${index}`,
//                         label: `${index}`,
//                         active: true,
//                         page: index
//                     }) 
//             }
            

//             if (endIndex < count) {
//                 link.push({
//                     url: `/?page=${page + 1}`,
//                     label: "Next &raquo;",
//                     active: false,
//                     page: page + 1
//                 })
//             }  

//             res.status(200).json({
//                 data: companies,
//                 payload: {pagination: {
//                     page: page,
//                     items_per_page: limit,
//                     first_page_url: '/?page=1',
//                     from: fromValue,
//                     last_page: lastPage,
//                     links: link,
//                     next_page_url: page + 1 > lastPage? null :`/?page=${page + 1}`,
//                     items_per_page: limit,
//                     prev_page_url: page - 1 === 0 ? null :` /?page=${page - 1}`,
//                     to: toValue,
//                     total: count
//                 }}
//             })
//         });
//     });
// })

// // @ desc Get something
// // @rout GET api/company/:id/project
// const getQuotationById = asyncHandler (async (req, res) => {
//     const quotations = await Quotation.find(req.params.id)

//     res.status(200).json({
//         data: quotations
//     })
// })

// @ desc Get something
// @rout GET 
const getTransactions = asyncHandler (async (req, res) => {
    const expenses = await Expenses.find()

    res.status(200).json({
        transactions: expenses
    })
})

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateTransaction = asyncHandler (async (req, res) => {

    const expenses = await Expenses.findById(req.params.id)

    if(!expenses){
        res.status(400)
        throw new Error('expenses not found')
    }

    await Expenses.findByIdAndUpdate(req.params.id, req.body, {new: true})

    const leftover = await Expenses.find()

    res.status(200).json({
        transactions: leftover
    })
})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteTransaction = asyncHandler (async (req, res) => {
    const expenses = await Expenses.findById(req.params.id)

    if(!expenses){
        res.status(400)
        throw new Error('expenses not found')
    }

    await Expenses.findByIdAndDelete(req.params.id)

    const leftover = await Expenses.find()

    res.status(200).json({
        transactions: leftover
    })
})

module.exports = {
    registerExpenses,
    // queryQuotation,
    getTransactions,
    updateTransaction,
    deleteTransaction
}