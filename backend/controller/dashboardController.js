const asyncHandler = require('express-async-handler')

// @ desc Get something
// @rout GET /api/dashboard
const getSomething = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Get something'})
})

// @ desc SET something
// @rout POST /api/dashboard
const setSomething = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Set something'})

})

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateSomething = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Update something ${req.params.id}`})

})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteSomething = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Delete something ${req.params.id}`})

})

module.exports = {
    getSomething,
    setSomething,
    updateSomething,
    deleteSomething
}