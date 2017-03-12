const router = require('express').Router();
const controller = require('./controller');
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.update)
module.exports = router;