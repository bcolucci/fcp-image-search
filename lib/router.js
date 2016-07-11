'use strict';

const router = require('express').Router()
  , search = require('./search');

router.get('/search/:q', (req, res, next) => search.search(req.params.q, { offset: Number(req.query.offset) || 0 })
  .then(result => res.json(result))
  .catch(next));

router.get('/recently', (_, res) => res.json(search.recentSearches()));
router.get('/topsearches', (_, res) => res.json(search.topSearches()));

module.exports = router;
