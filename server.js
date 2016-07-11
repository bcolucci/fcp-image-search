'use strict';

const app = require('express')();

process.on('uncaughtException', err => console.error(err));

app.use(require('./lib/router'));
app.listen(process.env.PORT, () => console.log('Server listening on :%d', process.env.PORT));
