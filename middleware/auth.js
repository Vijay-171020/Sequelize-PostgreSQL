const jwt = require('jsonwebtoken');
const { User } = require('../models');
module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'No token' });
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(payload.userId);
        if (!req.user) throw new Error();
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};
