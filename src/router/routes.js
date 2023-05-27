const express = require('express');
const router = express.Router();
const datosRoutes = require('./data-search');

router.use('/', datosRoutes);

module.exports = router;
