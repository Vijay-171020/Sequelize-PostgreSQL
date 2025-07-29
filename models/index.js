require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const User = require('./user')(sequelize, DataTypes);
const Address = require('./address')(sequelize, DataTypes);
const Post = require('./post')(sequelize, DataTypes);
const Course = require('./course')(sequelize, DataTypes);


User.hasOne(Address, { onDelete: 'CASCADE' });
Address.belongsTo(User);

User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User);

User.belongsToMany(Course, { through: 'UserCourses' });
Course.belongsToMany(User, { through: 'UserCourses' });


module.exports = { sequelize, User, Address, Post, Course };
