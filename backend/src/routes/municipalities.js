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

    if (req.query && req.query.field && req.query.order && req.query.limit) {
      const {field, order, limit} = req.query;
      const sorted = municipalities.sort((a, b) => {
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
