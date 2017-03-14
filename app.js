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
//hook up router
app.use(require('./router'));
//hook up cookies and flash
app.use(cookieParser());
app.use(flash());
//passport strat
const person = require('./models/user');
//check for life
app.listen(PORT, () => {
    console.log(`ALIVE ON PORT ${PORT}`)
});