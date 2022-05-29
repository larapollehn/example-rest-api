const express = require('express');
const artistsController = require('../controller/artists');

const router = express.Router();
router.route('/').get(artistsController.get);

module.exports = router;