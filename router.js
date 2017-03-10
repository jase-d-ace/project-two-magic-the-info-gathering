const router = require('express').Router();
router.use('/cards', require('./controllers/cards'));
//router.use('/deck', require('./controllers/decks'));
//router.use('/api', require('./controllers/api'));
router.get('/', (req, res) => {
    res.render('index');
});
module.exports = router;