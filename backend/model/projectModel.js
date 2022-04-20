const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    text: {
        type: String,
        required: [true, 'PLease add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)

