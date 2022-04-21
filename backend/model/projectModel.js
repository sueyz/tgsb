const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Company'
    },
    type: {
        type: String,
        required: [true, 'PLease add quotation type']
    },
    name: {
        type: String,
        required: [true, 'PLease add project name']
    },
    invoiceNo: {
        type: String,
        required: [true, 'PLease add an invoice number']
    },
    currency: {
        type: String,
        required: [true, 'PLease add a currency']
    },
    quotation: {
        type: String,
        required: [true, 'PLease add a quotation price']
    },
    //get time updated from timestamps updated everytime change balance paid only
    balancePaid: {
        type: String,
        required: false
    },
    balanceDue: {
        type: String,
        required: false
    },
    nextPaymentDay: {
        type: Number,
        required: false
    },
    totalPaymentDays: {
        type: Number,
        required: false
    },
    paymentTerm: {
        type: String,
        required: false
    },
    remark: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)

