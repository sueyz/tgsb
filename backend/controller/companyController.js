const asyncHandler = require('express-async-handler')
const Company = require('../model/companyModel')

// @ desc Register Company
// @rout Post /api/registerCompany
// @access Public
const registerCompany = asyncHandler( async (req, res) => {
    const {name, address, email, phone, poc } = req.body

    if(!name || !email || !email){
        res.status(400)
        throw new Error('Please add all required fields')
    }

    //Create Company
    const company = await Company.create({
        name,
        address,
        email,
        phone,
        poc
    })

    if(company){
        res.status(201).json({
            _id: company.id,
            name: company.name,
            address:company.address,
            email:company.email,
            phone:company.phone,
            poc:company.poc
        })
    } else{
        res.status(400)
        throw new Error('Invalid company data')
    }
})

// @ desc Get Company
// @rout GET /api/company/:id
// @access Public
const getCompany = asyncHandler (async (req, res) => {
    const company = await Company.findById(req.params.id)

    res.status(200).json(company)
})

module.exports = {
    registerCompany,
    getCompany
}