const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please add a type']
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
    accountNo: {
        type: String,
    },
    bank: {
        type: String,
    },
    avatar:{
        type: String,
        required: false
    }
},{
    timestamps: true
})

//for updating must have
companySchema.methods.toJSON = function () {
    return {
      id: this._id,
      type: this.type,
      name: this.name,
      address: this.address,
      email: this.email,
      phone: this.phone,
      poc: this.poc,
      accountNo: this.accountNo,
      bank: this.bank,
      avatar: this.avatar,
    }
  }

module.exports = mongoose.model('Company', companySchema)