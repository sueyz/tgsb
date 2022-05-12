const mongoose = require('mongoose')

const expensesSchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please add a expense category']
    },
    type: {
        type: String,
        required: [true, 'Please add a expense type']
    },
    bankName: {
        type: String,
        required: [true, 'Please add a bank name']
    },
    bankAccount: {
        type: String,
        required: [true, 'Please add a bank account']
    },
    card_type: {
        type: String,
        required: [true, 'Please add a card type']
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    createdAt: {
        type: Date,
        required: [true, 'Please add a date'],
        unique: true
    },
    amount: {
        type: String,
        required: [true, 'Please add an email'],
    },
    note: {
        type: String,
        required: false
    },
    lent_upfronted: {
        type: String,
        required: false
    },
    refund: {
        type: String,
        required: false
    },
    claim_date:{
        type: Date,
        required: false
    }
},{
    timestamps: true
})

//for updating must have
expensesSchema.methods.toJSON = function () {
    return {
      id: this._id,
      category: this.category,
      type: this.type,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      card_type: this.card_type,
      title: this.title,
      createdAt: this.createdAt,
      amount: this.amount,
      note: this.note,
      lent_upfronted: this.lent_upfronted,
      refund: this.refund,
      claim_date: this.claim_date,
    }
  }

module.exports = mongoose.model('Expenses', expensesSchema)