const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please add a first name']
    },
    last_name: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    phone :{
        type: String,
        required: false
    },
    role :{
        type: String,
        required: false
    },
    position :{
        type: String,
        required: false
    },
    last_login:{
        type: Date,
        required: false
    }
},{
    timestamps: true
})


// userSchema.methods.toJSON = function () {
//     return {
//       id: this._id,
//       first_name: this.first_name,
//       last_name: this.last_name,
//       email: this.email,
//       password: this.password,
//       phone: this.phone,
//       role: this.role,
//       position: this.position,
//       last_login: this.last_login
//     }
//   }

module.exports = mongoose.model('User', userSchema)