const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonReferenceSchema = new Schema({
    day: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'lessons',
        default: null
    }
})

const studentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    lesson: [lessonReferenceSchema],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('students', studentSchema)
