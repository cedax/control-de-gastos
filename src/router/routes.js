const express = require('express');
const router = express.Router();
const publicRoute = require('./public');
const privateRoute = require('./private');
const apiRoute = require('./api');

router.use('/', publicRoute);
router.use('/', privateRoute);
router.use('/api', apiRoute);

module.exports = router;
