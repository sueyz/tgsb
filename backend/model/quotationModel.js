const mongoose = require('mongoose')

const quotationsSchema = mongoose.Schema({
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
    address: {
        type: String,
        required: [true, 'PLease add project address']
    },
    invoiceNo: {
        type: String,
        unique: true,
        required: [true, 'PLease add an invoice number']
    },
    workType: {
        type: String,
        required: [true, 'PLease add work type']
    },
    quotations: {
        type: Array,
        default : [{desc: 'ex', amount: 0}],
        required: false
    },
    //get time updated from timestamps updated everytime change balance paid only
    balancePaid: {
        type: Number,
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
    //ex: 40,40,20 
    paymentTerm: {
        type: Array,
        default : [{percentage: 0, desc: 'ex', amount: 0}],
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
    },
    poc: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    },
    isFinished: {
        type: Boolean,
        required: false
    },
}, {
    timestamps: true
})

quotationsSchema.methods.toJSON = function () {
    return {
      id: this._id,
      company: this.company,
      type: this.type,
      name: this.name,
      address: this.address,
      invoiceNo: this.invoiceNo,
      quotations: this.quotations,
      balancePaid: this.balancePaid,
      nextPaymentDate: this.nextPaymentDate,
      finalPaymentDate: this.finalPaymentDate,
      paymentTerm: this.paymentTerm,
      projectSchedule: this.projectSchedule,
      note: this.note,
      poc: this.poc,
      contact: this.contact,
      isFinished: this.isFinished,
      workType: this.workType
    }
  }

module.exports = mongoose.model('Quotations', quotationsSchema)

