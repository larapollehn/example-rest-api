const express = require('express');
const artistRoutes = require('./artists');

// attach Routers to routes
const router = express.Router();
router.use('/artists', artistRoutes);

// health check
router.get('/', (req, res) => res.send('API is online!'));

module.exports = router;