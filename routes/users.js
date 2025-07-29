const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const userController = require('../controllers/userController');
const { updateUserValidator, addressValidator, enrollValidator } = require('../validators/userValidator');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, updateUserValidator, validate, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.post('/:id/address', auth, addressValidator, validate, userController.upsertAddress);
router.post('/:id/enroll', auth, enrollValidator, validate, userController.enrollCourses);

module.exports = router;
