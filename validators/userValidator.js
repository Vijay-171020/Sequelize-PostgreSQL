const { body } = require('express-validator');

exports.updateUserValidator = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Must be a valid email'),
];

exports.addressValidator = [
    body('street').notEmpty().withMessage('Street is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('zip').notEmpty().withMessage('ZIP code is required'),
];

exports.enrollValidator = [
    body('courseIds')
        .isArray({ min: 1 })
        .withMessage('courseIds must be an array with at least one course ID'),
];
