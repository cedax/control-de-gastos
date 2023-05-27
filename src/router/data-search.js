const express = require('express');
const router = express.Router();
const authenticateJWT = require('./middleware/authenticateJWT');
const { pathViews } = require('../utils/static-path');

router.get('/', (req, res) => {
    res.sendFile('index.html', pathViews);
});

module.exports = router;