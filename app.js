//express-mustache-pgp boilerplate
const express = require('express')
    , pgp = require('pg-promise')()
    , mustacheExpress = require('mustache-express');
const PORT = process.env.PORT || 8080;
const app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
//hook up morgan
const morgan = require('morgan');
app.use(morgan('dev'));
//hook up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//hook up router
app.use(require('./router'));
//check for life
app.listen(PORT, () => {
    console.log(`ALIVE ON PORT ${PORT}`)
});