const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Company = require('../model/companyModel')

// @ desc Get something
// @rout GET /api/dashboard
const getSomething = asyncHandler (async (req, res) => {
    const companies = await Company.find()

    res.status(200).json(companies)
})

// @ desc SET something
// @rout POST /api/dashboard
const setSomething = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const company = await Company.create({
        text: req.body.text
    })

    res.status(200).json(company)

})

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateSomething = asyncHandler (async (req, res) => {
    const company = await Company.findById(req.params.id)

    if(!company){
        res.status(400)
        throw new Error('Company not found')
    }

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedCompany)

})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteSomething = asyncHandler (async (req, res) => {
    const company = await Company.findById(req.params.id)

    if(!company){
        res.status(400)
        throw new Error('Company not found')
    }

    await company.remove()

    res.status(200).json({id: req.params.id})

})

module.exports = {
    getSomething,
    setSomething,
    updateSomething,
    deleteSomething
}