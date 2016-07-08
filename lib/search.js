'use strict';

const request = require('request')
  , PIXABAY = require('./pixabay.json');

const search = q => {
  console.log(q);
};

module.exports = { search };
