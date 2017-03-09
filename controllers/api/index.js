const router = require('express').Router();
const controller = require('./controller');
router.get('/decks', controller.index);
router.get('/decks/:id', controller.show);
router.post('/decks', controller.create);
router.put('/decks/:id', controller.update);
router.delete('/decks/:id', controller.delete);
module.exports = router;