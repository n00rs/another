const Pool = require('pg').Pool;

const pool = new Pool({
    'user': 'postgres',
    'password': '1632',
    'database': 'bitroot',
    'host': 'localhost',
    'port': 5432
})


module.exports = pool;