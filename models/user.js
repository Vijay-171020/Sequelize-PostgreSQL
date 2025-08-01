const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: { type: DataTypes.STRING, allowNull: false },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true,
            validate: { isEmail: true }
        },
        password: { type: DataTypes.STRING, allowNull: false },
    }, {
        hooks: {
            beforeCreate: async (user) => { user.password = await bcrypt.hash(user.password, 10); },
        }
    });

    User.prototype.validatePassword = function (pwd) {
        return bcrypt.compare(pwd, this.password);
    };

    return User;
};
