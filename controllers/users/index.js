const person = require('../../models/user');
const router = require('express').Router();
const passport = require('passport');
const AuthService = require('../../services/auth');
router.post('/', passport.authenticate('local-signup', {
    failureRedirect: '/'
    , successRedirect: '/decks/new'
}));
router.get('/new', (req, res) => {
    res.render('users/new');
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/'
    , successRedirect: '/cards'
}));
module.exports = router;