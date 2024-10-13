const mongoose = require('mongoose');
const Student = require('../models/Student')
const Lesson = require('../models/Lesson')
const { validDays, validTimes, defaultLessons } = require('../constants/constants');
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const students = await Student
            .find({}, 'name')
            .sort({name: -1})
        res.status(200).json(students);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const student = await Student.findById(req.params.id).populate('lesson.lesson')
        res.status(200).json(student);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Student.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({
            message: 'Студент был отчислен.'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

const createLessonsArray = async (req) => {
    const lessons = [];
    for (let i = 0; i < 60; i++) {
        const day = validDays[Math.floor(i / validTimes.length)];
        const time = validTimes[i % validTimes.length];
        const lessonId = req.body[`lessons[${i}].lesson`];

        if (lessonId) {
            const lesson = await Lesson.findById(lessonId);
            if (lesson) {
                lessons.push({
                    day: day,
                    time: time,
                    lesson: lesson._id
                });
            } else {
                lessons.push({
                    day: '',
                    time: '',
                    lesson: null
                });
            }
        } else {
            lessons.push({
                day: '',
                time: '',
                lesson: null
            });
        }
    }
    return lessons;
}

module.exports.add = async function (req, res) {
    try {
        const lessons = await createLessonsArray(req);

        const student = await new Student({
            name: req.body.name,
            imageSrc: req.file ? req.file.path : '',
            lesson: lessons,
            user: req.body.user,
        }).save();
        res.status(201).json(student);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {

        const lessons = await createLessonsArray(req);

        const updateData = {
            name: req.body.name,
            imageSrc: req.file ? req.file.path : req.body.imageSrc,
            user: req.body.user
        };

        // Если уроки не пустые, обновляем только их.
        if (lessons.length > 0) {
            const student = await Student.findById(req.params.id);
            const existingLessons = student.lesson || [];

            // Обновляем существующий массив уроков
            for (let i = 0; i < lessons.length; i++) {
                if (lessons[i].lesson) {
                    existingLessons[i] = lessons[i];
                }
            }

            updateData.lesson = existingLessons;
        }

        const student = await Student.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateData },
            { new: true }
        );

        res.status(200).json(student);
    } catch (e) {
        errorHandler(res, e);
    }
};

// module.exports.add = async function (req, res) {
//     try {
//         const lessons = [];
//         for (let i = 0; i < 60; i++) {
//
//             const day = req.body[`lessons[${i}].day`];
//             const time = req.body[`lessons[${i}].time`];
//             const lessonId = req.body[`lessons[${i}].lesson`];
//
//             if (validDays.includes(day) && validTimes.includes(time) && lessonId) {
//                 const lesson = await Lesson.findById(lessonId);
//                 if (lesson) {
//                     lessons.push({
//                         day: day,
//                         time: time,
//                         lesson: lesson._id
//                     });
//                 }
//             }
//         }
//
//         const student = await  new Student({
//             name: req.body.name,
//             imageSrc: req.file ? req.file.path : '',
//             lesson: lessons,
//             user: req.body.user
//         }).save();
//         res.status(201).json(student);
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }
//
// module.exports.update = async function (req, res) {
//     try {
//         const lessons = [];
//         for (let i = 0; i < 60; i++) {
//             const day = req.body[`lessons[${i}].day`];
//             const time = req.body[`lessons[${i}].time`];
//             const lessonId = req.body[`lessons[${i}].lesson`];
//
//             if (validDays.includes(day) && validTimes.includes(time) && lessonId) {
//                 const lesson = await Lesson.findById(lessonId);
//                 if (lesson) {
//                     lessons.push({
//                         day: day,
//                         time: time,
//                         lesson: lesson._id
//                     });
//                 }
//                 // else {
//                 //     console.error(`Lesson with id ${lessonId} not found`);
//                 // }
//             }
//             // else {
//             //     console.error(`Invalid lesson data at index ${i}: ${day}, ${time}, ${lessonId}`);
//             // }
//         }
//
//         const student = await Student.findOneAndUpdate(
//             { _id: req.params.id },
//             {
//                 $set: {
//                     name: req.body.name,
//                     imageSrc: req.file ? req.file.path : req.body.imageSrc,
//                     lessons: lessons,
//                     user: req.body.user
//                 }
//             },
//             { new: true }
//         );
//
//         // if (!student) {
//         //     return res.status(404).json({ message: 'Student not found' });
//         // }
//
//         res.status(200).json(student);
//     } catch (e) {
//         // console.error(e);
//         // res.status(500).json({ message: 'Internal server error', error: e.message });
//         errorHandler(res, e);
//     }
// }