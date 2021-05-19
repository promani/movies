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
    form: function (req, res) {
        db.Actor.findAll()
            .then((data) => {
                return res.render('movies/create', {
                    genres: data
                });
            })
    },
    store: function (req, res) {
        db.Movie.create(req.body)
        .then(() => {
            res.redirect('/movies')
        })
        .catch((error) => {
            return res.send(error);
        })
    },
    search: function (req, res) {
        let criteria = req.query.search

        db.Movie.findAll({
            where: [
                { title: { [op.like]: '%'+criteria+'%'} }
            ],
        })
        .then((data) => {
            return res.render('movies/index', { 
                movies: data 
            });
        })
    },
    edit: function (req, res) {
        db.Actor.findAll()
            .then((genres) => {
                db.Movie.findByPk(req.params.id)
                    .then((movie) => {
                        return res.render('movies/edit', { 
                            genres: genres,
                            movie: movie 
                        });
                    })
            })
    },
    update: function (req, res) {
        db.Movie.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((error) => {
            return res.send(error);
        })
    },
    delete: function (req, res) {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((error) => {
            return res.send(error);
        })
    }
}

module.exports = moviesController;