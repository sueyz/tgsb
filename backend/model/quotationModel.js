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
    address1: {
        type: String,
        required: [true, 'PLease add project address1']
    },
    address2: {
        type: String,
        required: false
    },
    address3: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: [true, 'PLease add project zip']
    },
    city: {
        type: String,
        required: [true, 'PLease add project city']
    },
    state: {
        type: String,
        required: [true, 'PLease add project state']
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
    next_payment_date: {
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
        default : [{desc: 'ex', week: '0-2', remark: 'ex'}],
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
    email: {
        type: String,
        required: false
    },
    attachments: {
        type: Array,
        default : [],
        required: false
    },
    lock: {
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
      address1: this.address1,
      address2: this.address2,
      address3: this.address3,
      zip: this.zip,
      city: this.city,
      state: this.state,
      invoiceNo: this.invoiceNo,
      quotations: this.quotations,
      balancePaid: this.balancePaid,
      next_payment_date: this.next_payment_date,
      finalPaymentDate: this.finalPaymentDate,
      paymentTerm: this.paymentTerm,
      projectSchedule: this.projectSchedule,
      note: this.note,
      poc: this.poc,
      contact: this.contact,
      email: this.email,
      workType: this.workType,
      attachments: this.attachments,
      lock: this.lock
    }
  }

module.exports = mongoose.model('Quotations', quotationsSchema)

