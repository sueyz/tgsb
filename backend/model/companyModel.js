const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'PLease add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Company', companySchema)