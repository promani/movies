let db = require("../database/models");

const op = db.Sequelize.Op;

let moviesController = {
    detail: function (req, res) {
        db.Movie.findByPk(req.params.id)
        .then((data) => {
            return res.render('movies/detail', { 
                movie: data 
            });
        })
        .catch((error) => {
            return res.send(error);
        })
    },
    index: function (req, res) {
        db.Movie.findAll()
        .then((data) => {
            return res.render('movies/index', { 
                movies: data 
            });
        })
        .catch((error) => {
            return res.send(error);
        })
    },
    news: function (req, res) {
        db.Movie.findAll({
            order: [
                [ 'release_date', 'DESC' ]
            ],
            limit: 5
        })
        .then((data) => {
            return res.render('movies/index', { 
                movies: data 
            });
        })
        .catch((error) => {
            return res.send(error);
        })
    },
    recomended: function (req, res) {
        db.Movie.findAll({
            where: [
                { rating: { [op.gte]: 8} }
            ],
            order: [
                [ 'rating', 'DESC' ]
            ],
        })
        .then((data) => {
            return res.render('movies/index', { 
                movies: data 
            });
        })
        .catch((error) => {
            return res.send(error);
        })
    },
}

module.exports = moviesController;