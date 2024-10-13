const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/student')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.add)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)
// router.get('/:lessonId', passport.authenticate('jwt', {session: false}), controller.getByLessonId)

module.exports = router