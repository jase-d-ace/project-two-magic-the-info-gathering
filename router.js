const router = require('express').Router();
//router.get('/cards', require('./controllers/cards'));
//router.get('/deck', require('./controllers/deck'));
//router.get('/api', require('./controllers/api'));
router.get('/', (req, res) => {
    res.render('index');
});
module.exports = router;