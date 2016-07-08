'use strict';

const router = require('express').Router()
  , search = require('./search');

router.get('/search/:q', (req, res) => {
  //TODO
  res.end();
});

module.exports = router;
