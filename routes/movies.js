var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.index);
router.get('/search', moviesController.search);
router.get('/recomended', moviesController.recomended);
router.get('/news', moviesController.news);
router.get('/:id/detail', moviesController.detail);
router.get('/create', moviesController.form);
router.post('/create', moviesController.store);
router.get('/:id/edit', moviesController.edit);
router.post('/:id/edit', moviesController.update);
router.post('/:id/delete', moviesController.delete);

module.exports = router;
