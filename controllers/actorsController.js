let db = require("../database/models");

let actorsController = {
    index: function (req, res) {
        db.Actor.findAll()
        .then((data) => {
            return res.render('actors/index', { 
                actors: data 
            });
        })
        .catch((error) => {
            return res.send(error);
        })
    },
}

module.exports = actorsController;