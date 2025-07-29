const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const courseController = require('../controllers/courseController');
const { createCourseValidator, updateCourseValidator } = require('../validators/courseValidator');
const router = express.Router();

router.get('/', courseController.getAllCourses);
router.post('/', createCourseValidator, validate, courseController.createCourse);
router.get('/:id', courseController.getCourseById);
router.put('/:id', updateCourseValidator, validate, courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
