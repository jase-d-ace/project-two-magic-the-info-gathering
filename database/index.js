const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://jasonandrada@localhost:5432/mtgdb');
module.exports = db;