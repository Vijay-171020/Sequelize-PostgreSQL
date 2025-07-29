const { body } = require('express-validator');

exports.createCourseValidator = [
    body('name').notEmpty().withMessage('Course name is required'),
];

exports.updateCourseValidator = [
    body('name').optional().notEmpty().withMessage('Course name cannot be empty'),
];
