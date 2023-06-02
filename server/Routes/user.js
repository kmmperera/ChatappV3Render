const express = require('express');
const router = express.Router();
const { addcomplain, editcomplain,deletecomplain } = require('../Controllers/complains');


router.post('/addcomplain', addcomplain);
router.post('/editcomplain',editcomplain);
router.post('/deletecomplain',deletecomplain);

module.exports = router;