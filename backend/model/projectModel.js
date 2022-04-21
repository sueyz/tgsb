const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Company'
    },
    text: {
        type: String,
        required: [true, 'PLease add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)

