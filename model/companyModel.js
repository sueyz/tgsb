const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const companySchema = mongoose.Schema({
    // type: {
    //     type: String,
    //     required: [true, 'Please add a type']
    // },
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
    bankAccount: {
        type: String,
        required: false
    },
    bankName: {
        type: String,
        required: false
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
    //   type: this.type,
      name: this.name,
      address: this.address,
      email: this.email,
      phone: this.phone,
      bankAccount: this.bankAccount,
      bankName: this.bankName,
      avatar: this.avatar,
    }
  }

module.exports = mongoose.model('Company', companySchema)