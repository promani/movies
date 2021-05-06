let db = require("../database/models");

let usersController = {
    index: function (req, res) {
        db.User.findAll()
        .then((data) => {
            return res.render('users/index', { 
                users: data 
            });
        })
        .catch((error) => {
            return res.send(error);
        })
    },
}

module.exports = usersController;