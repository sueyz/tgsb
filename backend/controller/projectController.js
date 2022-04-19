const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Project = require('../model/projectModel')

// @ desc Get something
// @rout GET /api/project
const getProject = asyncHandler (async (req, res) => {
    const projects = await Project.find()

    res.status(200).json(projects)
})

// @ desc SET something
// @rout POST /api/dashboard
const setProject = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const project = await Project.create({
        text: req.body.text
    })

    res.status(200).json(project)

})

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateProject = asyncHandler (async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedProject)

})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteProject = asyncHandler (async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    await project.remove()

    res.status(200).json({id: req.params.id})

})

module.exports = {
    getProject,
    setProject,
    updateProject,
    deleteProject
}