const bcrypt = require('bcrypt');
const db = require('../database');
const user = {};
user.create = (user) => {
    const password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5));
    return db.one(`INSERT INTO users(username, password_digest) VALUES($1, $2) returning *;`, [user.username, password])
};
user.findByUsername = (username) => {
    return db.one('SELECT * FROM users WHERE username = $1;', [username])
};
module.exports = user;