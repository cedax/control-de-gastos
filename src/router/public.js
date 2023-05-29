const express = require('express');
const router = express.Router();
const authenticateJWT = require('./middleware/authenticateJWT');
const { pathViews } = require('../utils/static-path');

router.get('/login', (req, res) => {
    res.sendFile('public/login/login.html', pathViews);
});

module.exports = router;