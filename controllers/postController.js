const { Post } = require('../models');

exports.createPost = async (req, res) => {
    const post = await Post.create({ ...req.body, UserId: req.user.id });
    res.json(post);
};

exports.getAllPosts = async (req, res) => {
    res.json(await Post.findAll({ include: ['User'] }));
};

exports.getPostById = async (req, res) => {
    const p = await Post.findByPk(req.params.id);
    if (!p) return res.sendStatus(404);
    res.json(p);
};

exports.updatePost = async (req, res) => {
    const p = await Post.findByPk(req.params.id);
    if (!p) return res.sendStatus(404);
    await p.update(req.body);
    res.json(p);
};

exports.deletePost = async (req, res) => {
    const p = await Post.findByPk(req.params.id);
    if (!p) return res.sendStatus(204);
    await p.destroy();
    res.sendStatus(204);
};
