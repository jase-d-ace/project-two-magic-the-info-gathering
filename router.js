const router = require('express').Router();
router.use('/cards', require('./controllers/cards'));
//router.use('/deck', require('./controllers/decks'));
router.use('/api/cards', require('./controllers/api/cards'));
//router.use('/api/decks', require('./controllers/api/decks'));
router.get('/', (req, res) => {
    res.render('index');
});
module.exports = router;