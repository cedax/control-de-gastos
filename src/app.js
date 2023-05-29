const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router/routes');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;