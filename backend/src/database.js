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

exports.getRegions = async () => {
  return pool.query('select * from maakunnat;');
}

exports.getRegion = async (name) => {
  return pool.query('select * from maakunnat where nimi = $1;', [name]);
}

exports.getMunicipalities = async () => {
  return pool.query('select * from kunnat;');
}

exports.getMunicipality = async (name) => {
  return pool.query('select * from kunnat where nimi = $1;', [name]);
}
