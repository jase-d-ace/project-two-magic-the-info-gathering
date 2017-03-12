const router = require('express').Router();
const controller = require('./controller');
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;