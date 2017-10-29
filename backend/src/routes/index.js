const express = require('express');
const router = express.Router();
const db = require('../database.js');
const debug = require('debug')('backend:server/');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const response = await db.testConnection();
    const population = response.rows[0].population;
    res.json({population: population});
  } catch (e) {
    console.log(e);
    res.json({error: e});
  }
});

module.exports = router;
