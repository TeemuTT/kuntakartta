const express = require('express');
const router = express.Router();
const db = require('../database.js');
const debug = require('debug')('backend:server/regions');

router.get('/', async (req, res, next) => {
  try {
    const response = await db.getRegions();
    const regions = [];
    for (const r of response.rows) {
      regions.push(r);
    }
    res.json(regions);
  } catch (e) {
    res.json({error: e});
  }
});

router.get('/:name', async (req, res, next) => {
  try {
    const response = await db.getRegion(req.params.name);
    const region = response.rows[0];
    res.json(region);
  } catch (e) {
    res.json({error: e});
  }
});

module.exports = router;
