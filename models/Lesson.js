const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('lessons', lessonSchema)