const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Project = require('../model/projectModel')
const User = require('../model/userModel')

// @ desc Get something
// @rout GET /api/project
const getProject = asyncHandler (async (req, res) => {
    const projects = await Project.find({ user : req.user.id })

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
        text: req.body.text,
        user: req.user.id
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

    const user = await User.findById(req.user.id)

    //Chekc for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches the project user
    if(project.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not auhtorized')
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

    const user = await User.findById(req.user.id)

     //Chekc for user
     if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches the project user
    if(project.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not auhtorized')
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