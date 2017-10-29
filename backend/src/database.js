const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.testConnection = async () => {
  return pool.query('select sum(väkiluku) as population from maakunnat;');
}
