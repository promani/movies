module.exports = (sequelize, DataTypes) => {
    let alias = 'Actor';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.DECIMAL
        },
        favorite_movie_id: {
            type: DataTypes.INTEGER
        },
    }

    let config = {
        tableName: 'actors',
        underscored: true
    }

    const Actor = sequelize.define(alias, cols, config);

    return Actor;
}