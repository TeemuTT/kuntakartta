const express = require('express');
const router = express.Router();
const db = require('../database.js');
const debug = require('debug')('backend:server/municipalities');

router.get('/', async (req, res, next) => {
  try {
    const response = await db.getMunicipalities();
    const municipalities = [];
    for (const r of response.rows) {
      municipalities.push(r);
    }
    res.json(municipalities);
  } catch (e) {
    res.json({error: e});
  }
});

router.get('/:name', async (req, res, next) => {
  try {
    const response = await db.getMunicipality(req.params.name);
    const municipality = response.rows[0];
    res.json(municipality);
  } catch (e) {
    res.json({error: e});
  }
});

module.exports = router;
