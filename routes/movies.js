var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.index);
router.get('/recomended', moviesController.recomended);
router.get('/news', moviesController.news);
router.get('/:id/detail', moviesController.detail);

module.exports = router;
