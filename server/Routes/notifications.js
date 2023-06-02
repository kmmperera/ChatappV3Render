const express = require('express');
const router = express.Router();

const {dirrectMessage } = require('../Controllers/notifications');


router.post('/sendnotifications', dirrectMessage);

module.exports = router;
