const bcrypt = require('bcryptjs');
let db = require("../database/models");

let securityController = {
    login: function (req, res) {
        return res.render('security/login', {
            failed: req.query.failed
        });
    },
    authenticate: function (req, res) {
        db.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                if(req.body.rememberme) {
                    res.cookie('userId', user.id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
                }

                return res.redirect('/');
            }

            res.redirect('/login?failed=1'); 
        })
        .catch((error) => {
            res.redirect('/login?failed=1');
        })
    },
    register: function (req, res) {
        if (req.method == 'POST') {
            req.body.password = bcrypt.hashSync(req.body.password);
            db.User.create(req.body)
            .then(() => {
                return res.redirect('/')
            })
            .catch((error) => {
                return res.send(error);
            })
        }

        if (req.method == 'GET') {
            return res.render('security/register');
        }
    },
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie('userId');

        return res.redirect('/');
    },
}

module.exports = securityController;