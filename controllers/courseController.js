const { Course, User } = require('../models');

exports.getAllCourses = async (req, res) => {
    res.json(await Course.findAll());
};

exports.createCourse = async (req, res) => {
    const c = await Course.create(req.body);
    res.json(c);
};

exports.getCourseById = async (req, res) => {
    const c = await Course.findByPk(req.params.id, { include: [User] });
    if (!c) return res.status(404).json({ error: 'Not found' });
    res.json(c);
};

exports.updateCourse = async (req, res) => {
    const c = await Course.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: 'Not found' });
    await c.update(req.body);
    res.json(c);
};

exports.deleteCourse = async (req, res) => {
    const c = await Course.findByPk(req.params.id);
    if (!c) return res.sendStatus(204);
    await c.destroy();
    res.sendStatus(204);
};
