module.exports = (sequelize, DataTypes) => {
    let alias = 'Movie';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.DECIMAL
        },
        awards: {
            type: DataTypes.INTEGER
        },
        release_date: {
            type: DataTypes.DATE
        },
        length: {
            type: DataTypes.INTEGER
        },
        genre_id: {
            type: DataTypes.INTEGER
        },
    }

    let config = {
        tableName: 'movies',
        underscored: true
    }

    const Movie = sequelize.define(alias, cols, config);

    return Movie;
}