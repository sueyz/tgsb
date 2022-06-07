const asyncHandler = require('express-async-handler')
const Company = require('../model/companyModel')
const path = require('path');
const fs = require('fs')

// @ desc Register Company
// @rout Post /api/registerCompany
// @access Public
const registerCompany = asyncHandler(async (req, res) => {
    const { name, address, email, phone, poc, accountNo, bank, avatar, quotations } = req.body

    if (!name || !address || !email) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    //Check if Company exist
    const companyExists = await Company.findOne({ email }) // need to double check in case same email

    if (companyExists) {
        res.status(400)
        throw new Error('Company already exists!')
    }

    //Create Company
    const company = await Company.create({
        name,
        address,
        email,
        phone,
        poc,
        accountNo,
        bank,
        avatar
    })

    if (company) {
        res.status(201).json({
            _id: company.id,
            name: company.name,
            address: company.address,
            email: company.email,
            phone: company.phone,
            poc: company.poc,
            accountNo: company.accountNo,
            bank: company.bank
        })
    } else {
        res.status(400)
        throw new Error('Invalid company data')
    }
})

// @desc get  Company 
// @rout GEt /api/user/query
// @access Private
const queryCompany = asyncHandler(async (req, res) => {


    var userQuery = req.query.search;
    var searchString = new RegExp(userQuery, 'ig');

    const page = parseInt(req.query.page)
    var filter = req.query.filter_type
    var queryMatch = {}

    if (filter === undefined) {
        filter = null
        queryMatch = { name: searchString }
    } else {
        filter = filter.charAt(0).toUpperCase() + filter.slice(1)
        queryMatch = { name: searchString, type: filter }
    }

    const limit = 9

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const link = []


    Company.aggregate()
        .project({
            id: '$_id',
            name: 1,
            address: 1,
            email: 1,
            avatar: 1,
            phone: 1
        })
        .collation({ locale: "en" })
        .sort({ 'name': 1 })
        .match(queryMatch)
        .skip(startIndex)
        .limit(limit)
        .exec(function (err, companies) {
            if (err) throw err;


            Company.aggregate()
                .project({ name: 1 }) //for filter + search
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
                        data: companies,
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


// @ desc Get Company
// @rout GET /api/company/:id
// @access Public
const getCompanyById = asyncHandler(async (req, res) => {

    const company = await Company.findById(req.params.id)

    res.status(200).json({
        data: company
    })
})


// @ desc Get Company
// @rout GET /api/company/:id
// @access Public
const getAllCompany = asyncHandler(async (req, res) => {

    const company = await Company.find({ type: Object.keys(req.query)[0] })

    res.status(200).json({
        data: company
    })
})


// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateCompany = asyncHandler(async (req, res) => {

    const company = await Company.findById(req.params.id)

    if (!company) {
        res.status(400)
        throw new Error('Company not found')
    }

    const oldPhoto = company.avatar

    //  Remove old photo
    if (oldPhoto !== 'avatars/blank.png' && oldPhoto !== undefined) {
        console.log(__dirname)

        try {
            const oldPath = path.join(__dirname, '../public/media/', oldPhoto);

            console.log(__dirname)

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


    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedCompany)

})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteCompany = asyncHandler(async (req, res) => {

    const company = await Company.findById(req.params.id)

    if (!company) {
        res.status(400)
        throw new Error('Company not found')
    }

    const oldPhoto = company.avatar

    //  Remove old photo
    if (oldPhoto !== 'companies/blank.png' && oldPhoto !== undefined) {
        console.log(__dirname)

        try {
            const oldPath = path.join(__dirname, '../public/media/', oldPhoto);

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

    const deletedCompany = await Company.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedCompany)

})

const uploadAvatar = (req, res) => {

    if (!req.file) {
        res.status(400)
        throw new Error('Please choose an image')
    }

    res.status(200).json({
        filename: req.file.filename
    })
}


const fetchAvatar = (req, res) => {

    let file = req.params.id;

    let fileLocation = path.join(__dirname, '../public/media/companies', file);
    res.sendFile(`${fileLocation}`)
}


module.exports = {
    registerCompany,
    getCompanyById,
    queryCompany,
    updateCompany,
    deleteCompany,
    uploadAvatar,
    getAllCompany,
    fetchAvatar
}