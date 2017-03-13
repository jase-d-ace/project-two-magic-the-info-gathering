const router = require('express').Router();
const controller = require('./controller');
router.get('/', controller.index);
router.get('/:id', controller.sampleHand);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;