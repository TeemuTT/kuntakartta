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

    if (req.query && req.query.field && req.query.order && req.query.limit) {
      const {field, order, limit} = req.query;
      const sorted = regions.sort((a, b) => {
        let v1 = parseFloat(a[field]);
        let v2 = parseFloat(b[field]);
        if (v1 === v2) return 0;
        if (order === 'desc') {
          const tmp = v1;
          v1 = v2;
          v2 = tmp;
        }
        return (v1 < v2) ? -1 : 1;
      });
      res.json(sorted.slice(0, limit));
      return;
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
