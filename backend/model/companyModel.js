const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    accountNo: {
        type: String,
        required: [true, 'Please add an account number']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    poc: {
        type: String,
        required: false
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Company', companySchema)