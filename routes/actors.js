var express = require('express');
var router = express.Router();

const actorsController = require('../controllers/actorsController');

/* GET users listing. */
router.get('/', actorsController.index);

module.exports = router;
