const Lesson = require('../models/Lesson')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const lessons = await Lesson
            .find({}, 'name description')
            .sort({name: -1})
        setTimeout(() => {
            res.status(200).json(lessons)
        }, 1000)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const lesson = await Lesson.findById(req.params.id)
        res.status(200).json(lesson)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Lesson.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.add = async function (req, res) {
    try {
        const lesson = await new Lesson({
            name: req.body.name,
            description: req.body.description,
            user: req.user.id
        }).save()
        res.status(201).json(lesson)
    } catch (e) {
        errorHandler(res, e)
    }
}

// module.exports.update = async function (req, res) {
//     try {
//         const updated = {
//             name: req.body.name,
//             description: req.body.description
//         };
//         const lesson = await Lesson.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: updated },
//             { new: true }
//         );
//         res.status(200).json(lesson);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// }


