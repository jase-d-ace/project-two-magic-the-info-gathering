const router = require('express').Router();
const controller = require('./controller');
router.get('/', controller.index);
router.get('/new', controller.new);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.update);
module.exports = router;