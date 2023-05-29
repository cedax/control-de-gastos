const express = require('express');
const router = express.Router();
import { pathViews } from '../utils/static-path';

router.get('/', (req, res) => {
    res.sendFile('private/home/home.html', pathViews);
});

module.exports = router;