const express = require('express');
const routes = require('./router/routes');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;