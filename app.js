//express-mustache-pgp boilerplate
const express = require('express')
    , pgp = require('pg-promise')()
    , mustacheExpress = require('mustache-express')
    , passport = require('passport')
    , session = require('express-session')
    , flash = require('connect-flash')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , const PORT = process.env.PORT || 8080;
const app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
//hook up morgan
const morgan = require('morgan');
app.use(morgan('dev'));
//set equip passport before router
app.use(session({
    secret: 'monitor lizard'
    , resave: true
    , saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//hook up body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//hook up cookies and flash
app.use(cookieParser());
app.use(flash());
//passport (de)serialize
const person = require('./models/user');
const localStrat = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
passport.serializeUser((user, done) => {
    console.log('----------------------------------------');
    console.log('in passport.serializeUser callback');
    console.log('user: ');
    console.log(user);
    done(null, user);
});
passport.deserializeUser((userObj, done) => {
    person.findByUsername(userObj.username).then((user) => {
        done(null, user)
    }).catch((error) => {
        console.log('Passport Deserialize Error: ', error);
        done(null, false);
    });
});
//passport strategies
passport.use('local-signup', new localStrat({
    usernameField: 'user[username]'
    , passwordField: 'user[password]'
    , passReqToCallback: true
}, (req, username, password, done) => {
    person.create(req.body.user).then((user) => {
        return done(null, user);
    }).catch((error) => {
        console.log('User Creation Error: ', error);
        return done(null, false);
    });
}));
passport.use('local-login', new localStrat({
    usernameField: 'user[username]'
    , passwordField: 'user[password]'
    , passReqToCallback: true
}, (req, username, password, done) => {
    person.findByUsername(username).then((user) => {
        if (user) {
            const isAuthed = bcrypt.compareSync(password, password_digest);
            if (isAuthed) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        }
        else {
            return done(null, false);
        }
    }).catch((error) => {
        console.log('User Login Error: ', error);
    });
}));
//hook up router
app.use(require('./router'));
//check for life
app.listen(PORT, () => {
    console.log(`ALIVE ON PORT ${PORT}`)
});