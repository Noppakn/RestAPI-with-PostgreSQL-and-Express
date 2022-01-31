const Pool = require("pg").Pool;

const pool = new Pool({
    user:'postgres',
    password:'082544',
    database:'todo_database',
    host:'localhost',
    port: 5432
});
// Hi
module.exports = pool;