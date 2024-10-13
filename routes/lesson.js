const express = require('express')
const passport = require('passport')
const controller = require('../controllers/lesson')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), controller.add)
//router.post('/:studentId', controller.getByStudentId)

module.exports = router