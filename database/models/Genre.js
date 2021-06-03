let db = require(".");

module.exports = (sequelize, DataTypes) => {
    let alias = 'Genre';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        ranking: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.BOOLEAN
        }
    }

    let config = {
        tableName: 'genres',
        underscored: true
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function(models){
        Genre.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "genre_id"
        })
    }

    return Genre;
}