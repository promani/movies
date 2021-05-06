module.exports = (sequelize, DataTypes) => {
    let alias = 'User';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
    }

    let config = {
        tableName: 'users',
        underscored: true
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}