module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Address', {
        street: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
        zip: { type: DataTypes.STRING, allowNull: false },
    });
};
