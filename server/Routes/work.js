const express = require('express');
const router = express.Router();
const { getworkdetails,putworkdetails } = require('../Controllers/work');
router.post('/getworkdetails',getworkdetails);
router.post('/putworkdetails',putworkdetails);

module.exports = router;