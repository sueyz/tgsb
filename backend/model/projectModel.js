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
    quotationReg: {
        type: Array,
        default : [{desc: 'ex', amount: 0}],
        required: false
    },
    quotationSub: {
        type: Number,
        required: false
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
    nextPaymentDate: {
        type: Date,
        required: false
    },
    finalPaymentDate: {
        type: Date,
        required: false
    },
    bankName:{
        type: String,
        required: false
    },
    bankAccount:{
        type: String,
        required: false
    },
    //ex: 40,40,20 
    paymentTerm: {
        type: Array,
        default : [{percentage: 0, desc: 0}],
        required: false
    },
    projectSchedule: {
        type: Array,
        default : [{desc: 'ex', week: 0, remark: 'ex'}],
        required: false
    },
    note: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)

