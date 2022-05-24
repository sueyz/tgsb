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
    bank: {
        type: String,
        required: [true, 'Please add a bank']
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
        unique: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add an email'],
    },
    note: {
        type: String,
        required: false
    },
    isDebt: {
        type: Boolean,
        required: false
    },
    lent_upfronted: {
        type: String,
        required: false
    },
    // refund: {
    //     type: String,
    //     required: false
    // },
    // claim_date:{
    //     type: Date,
    //     required: false
    // }
},{
    timestamps: true
})

//for updating must have
expensesSchema.methods.toJSON = function () {
    return {
      id: this._id,
      category: this.category,
      type: this.type,
      bank: this.bank,
      card_type: this.card_type,
      title: this.title,
      createdAt: this.createdAt,
      amount: this.amount,
      note: this.note,
      isDebt: this.isDebt,
      lent_upfronted: this.lent_upfronted,
    //   refund: this.refund,
    //   claim_date: this.claim_date,
    }
  }

module.exports = mongoose.model('Expenses', expensesSchema)