const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Project = require('../model/projectModel')
const Company = require('../model/companyModel')

// @ desc Get something
// @rout GET api/company/:id/project
const getProject = asyncHandler (async (req, res) => {
    const projects = await Project.find({company : req.params.id})

    res.status(200).json(projects)
})

// @ desc SET something
// @rout POST /api/company/:id/project
const setProject = asyncHandler (async (req, res) => {
    const {type, name, invoiceNo, currency, quotation} = req.body


    if(!type || !name || !invoiceNo || !currency || !quotation ){
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const project = await Project.create({
        company: req.params.id,
        type: req.body.type,
        name: req.body.name,
        invoiceNo: req.body.invoiceNo,
        currency: req.body.currency,
        quotation: req.body.quotation,
        balancePaid: req.body.balancePaid,
        balanceDue: req.body.balanceDue,
        nextPaymentDay: req.body.nextPaymentDay,
        totalPaymentDays: req.body.totalPaymentDays,
        paymentTerm: req.body.paymentTerm,
        remark: req.body.remark
    })

    res.status(200).json(project)

})

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateProject = asyncHandler (async (req, res) => {
    const project = await Project.findById(req.params.projectId)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    const company = await Company.findById(req.params.id)

    //Check for company
    if(!company){
        res.status(401)
        throw new Error('Company not found')
    }

    // make sure logged in user matches the project user
    if(project.company.toString() !== company.id){
        res.status(401)
        throw new Error('Company not authorized')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, {new: true})

    res.status(200).json(updatedProject)

})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteProject = asyncHandler (async (req, res) => {
    const project = await Project.findById(req.params.projectId)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    const company = await Company.findById(req.params.id)

    if(!company){
        res.status(401)
        throw new Error('Company not found')
    }

    // make sure logged in user matches the project user
    if(project.company.toString() !== company.id){
        res.status(401)
        throw new Error('Company not authorized')
    }

    await project.remove()

    res.status(200).json({id: req.params.projectId})

})

module.exports = {
    getProject,
    setProject,
    updateProject,
    deleteProject
}