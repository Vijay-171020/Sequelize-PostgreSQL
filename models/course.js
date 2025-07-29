module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Course', {
        name: {
            type: DataTypes.STRING, allowNull: false, unique: true
        },
    });
};
