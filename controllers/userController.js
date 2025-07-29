const { Op } = require('sequelize');
const { User, Address, Course, Post } = require('../models');

// exports.getAllUsers = async (req, res) => {
//     const users = await User.findAll({ include: [Address, Course] });
//     res.json(users);
// };

exports.getAllUsers = async (req, res) => {
    try {
        const { name, city, state, course } = req.query;

        const userWhere = {};
        const addressWhere = {};
        const courseWhere = {};

        if (name) {
            userWhere.name = { [Op.iLike]: `%${name}%` };
        }

        if (city) {
            addressWhere.city = { [Op.iLike]: `%${city}%` };
        }

        if (state) {
            addressWhere.state = { [Op.iLike]: `%${state}%` };
        }

        if (course) {
            courseWhere.name = { [Op.iLike]: `%${course}%` };
        }

        const users = await User.findAll({
            where: userWhere,
            include: [
                {
                    model: Address,
                    where: Object.keys(addressWhere).length ? addressWhere : undefined,
                    required: Object.keys(addressWhere).length > 0,
                },
                {
                    model: Course,
                    where: Object.keys(courseWhere).length ? courseWhere : undefined,
                    required: Object.keys(courseWhere).length > 0,
                }
            ]
        });

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, { include: [Address, Course, Post] });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    await user.update(req.body);
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    await user.destroy();
    res.sendStatus(204);
};

exports.upsertAddress = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    const address = await Address.upsert({ ...req.body, UserId: user.id });
    res.json(address);
};

exports.enrollCourses = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    const courses = await Course.findAll({ where: { id: req.body.courseIds } });
    await user.setCourses(courses);
    res.json(await user.getCourses());
};
