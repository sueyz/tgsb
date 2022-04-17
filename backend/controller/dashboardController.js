// @ desc Get something
// @rout GET /api/dashboard
const getSomething = (req, res) => {
    res.status(200).json({message: 'Get something'})

}

// @ desc SET something
// @rout POST /api/dashboard
const setSomething = (req, res) => {
    res.status(200).json({message: 'Set something'})

}

// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateSomething = (req, res) => {
    res.status(200).json({message: `Update something ${req.params.id}`})

}

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteSomething = (req, res) => {
    res.status(200).json({message: `Delete something ${req.params.id}`})

}

module.exports = {
    getSomething,
    setSomething,
    updateSomething,
    deleteSomething
}