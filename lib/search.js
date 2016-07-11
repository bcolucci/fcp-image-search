'use strict';

const request = require('request')
  , qs = require('querystring')
  , cache = require('memory-cache')
  , PIXABAY = require('./pixabay.json');

const TOP_SEARCHES = {};

const offsetTrim = (result, offset) => {
  if (result.total <= offset)
    return {};
  if (0 === offset)
    return result;
  result.offset = offset;
  result.hits = result.hits.slice(offset);
  return result;
};

const countThisSearch = q => {
  TOP_SEARCHES[q] = TOP_SEARCHES[q] || { term: q, nbSearches: 0 };
  TOP_SEARCHES[q].nbSearches++;
  TOP_SEARCHES[q].lastSearch = new Date;
};

const resultMapper = row => {
  return {
    url: row.webformatURL,
    text: row.tags.replace(/\, /g, ' ')
  };
};

const search = (q, opts) => new Promise((resolve, reject) => {
  opts = opts || {};
  q = q.split(' ')
    .filter((str, i, arr) => str && 0 < str.length && i === arr.indexOf(str))
    .sort((str1, str2) => str1 < str2)
  if (0 === q.length)
    return resolve({});
  q = q.join(' ');
  countThisSearch(q);
  const offset = Math.max(0, opts.offset)
    , qBase64 = new Buffer(q, 'utf8').toString('base64')
    , result = cache.get(qBase64);
  if (result)
    return resolve(offsetTrim(result, offset));
  request.get(`${PIXABAY.url}?key=${PIXABAY.key}&per_page=${PIXABAY.limit}&q=${qs.escape(q)}`, (err, _, body) => {
    if (err)
      return reject(err);
    if ('string' === typeof(body))
      body = JSON.parse(body);
    body.total = Math.min(PIXABAY.limit, body.totalHits);
    delete body.totalHits;
    body.hits = (body.hits || []).map(resultMapper);
    cache.put(qBase64, body, 5 * 60 * 1000);
    resolve(offsetTrim(body, offset));
  });
});

const recentSearches = () => Object.keys(TOP_SEARCHES)
  .map(k => TOP_SEARCHES[k])
  .sort((s1, s2) => s1.lastSearch < s2.lastSearch)
  .slice(0, 100);

const topSearches = () => Object.keys(TOP_SEARCHES)
  .map(k => TOP_SEARCHES[k])
  .sort((s1, s2) => s1.nbSearches > s2.nbSearches)
  .slice(0, 100);

module.exports = { search, recentSearches, topSearches };
